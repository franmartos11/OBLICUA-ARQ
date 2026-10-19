'use client';

import { useEffect, useRef, useState, type FormEvent, type PointerEvent } from 'react';
import { ACCENT } from '@/lib/config';
import { LAYERS } from '@/lib/data';
import { Tracer, playLabel as labelFor, status, type TracerStatus } from '@/lib/tracer';

export default function Hero() {
  const accent = ACCENT;
  const rootRef = useRef<HTMLElement>(null);
  const hero = useRef<Tracer | null>(null);
  const [h, setH] = useState<TracerStatus>('idle');

  useEffect(() => {
    const root = rootRef.current;
    const plan = root?.querySelector<SVGSVGElement>('svg[data-plan]');
    if (!root || !plan) return;
    const reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const tr = new Tracer({
      svg: plan,
      pen: plan.querySelector<SVGGElement>('[data-pen]'),
      reduce,
      cnt: root.querySelector<HTMLElement>('.count'),
      scrubEl: root.querySelector<HTMLInputElement>('#scrub'),
      scroller: root.querySelector<HTMLElement>('.plan-scroll'),
      lis: Array.from(root.querySelectorAll<HTMLElement>('.lg li[data-li]')),
      budget: [0, 350, 450, 1100, 600, 400, 600, 250],
      gap: 70,
      preset: 1,
      minStartAt: 900,
      id: 'planta',
      getEls: (l) => Array.from(plan.querySelectorAll('[data-l="' + l + '"] [data-k]')),
      onChange: (p, e, t) => setH(status(p, e, t)),
    });
    try {
      tr.build();
    } catch {
      tr.items = [];
    }
    // Se dibuja al bajar: arranca cuando la planta queda al menos 60 % a la vista
    // y se vuelve a dibujar en cada pasada (no depende de botones ni de sessionStorage).
    tr.observeOnScroll(root.querySelector('.plan-scroll'), 0.6);
    // Recién ahora se muestra la planta: evita ver el dibujo completo un instante antes de rebobinarlo.
    plan.setAttribute('data-ready', '');
    hero.current = tr;
    return () => {
      tr.destroy();
      hero.current = null;
    };
  }, []);

  const onToggle = () => hero.current?.toggle();
  const onReplay = () => hero.current?.replay();
  const onScrubStart = () => hero.current?.scrubStart();
  const onScrubEnd = () => hero.current?.scrubEnd();
  const onScrub = (e: FormEvent<HTMLInputElement>) => hero.current?.scrubTo(Number(e.currentTarget.value) / 1000);

  // Mira con coordenadas en metros sobre la planta (solo con puntero que hace hover).
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty('--cx', x + 'px');
    el.style.setProperty('--cy', y + 'px');
    el.style.setProperty('--tx', x > r.width - 200 ? 'calc(-100% - 28px)' : '0%');
    el.style.setProperty('--ty', y > r.height - 48 ? 'calc(-100% - 28px)' : '0%');
    let label = '';
    const svg = el.querySelector<SVGSVGElement>('svg[data-plan]');
    const m = svg && svg.getScreenCTM ? svg.getScreenCTM() : null;
    if (m) {
      const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
      const mx = (p.x - 140) / 40;
      const my = (p.y - 120) / 40;
      const ix = Math.round(mx / 4.5);
      const iy = Math.round(my / 5);
      const near = ix >= 0 && ix < 5 && iy >= 0 && iy < 3 && Math.abs(mx - ix * 4.5) < 0.3 && Math.abs(my - iy * 5) < 0.3;
      label = near ? 'EJE ' + 'ABCDE'[ix] + '·' + (iy + 1) : 'X ' + mx.toFixed(2) + '  Y ' + my.toFixed(2) + ' m';
    }
    const tip = el.querySelector('[data-tip]');
    if (tip) tip.setAttribute('data-v', label);
    el.setAttribute('data-on', '1');
  };
  const onLeave = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setAttribute('data-on', '0');
  };

  const layers = LAYERS.map((l, i) => ({ ...l, i: String(i + 1), go: () => hero.current?.goLayer(i) }));
  const playLabel = labelFor(h);
  const goAttr = 'true';
  return (
    <section ref={rootRef} id="top" style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(32px, 5vw, 64px) clamp(16px, 4vw, 48px) 0", boxSizing: "border-box" }}>
      <div style={{ position: "relative" }}>
        <svg className="hb" aria-hidden="true" viewBox="0 0 1440 560" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", top: "-40px", left: "calc(-1 * clamp(16px, 4vw, 48px))", width: "calc(100% + 2 * clamp(16px, 4vw, 48px))", height: "calc(100% + 80px)", pointerEvents: "none" }} fill="none">
          <defs>
            <mask id="hbM" maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="560">
              <g stroke="#FFFFFF" strokeWidth="6">
                <path className="dr" pathLength="1" style={{ "--d": "0.27s" }} d="M96 44 V545" />
                <path className="dr" pathLength="1" style={{ "--d": "0.34s" }} d="M408 44 V545" />
                <path className="dr" pathLength="1" style={{ "--d": "0.4s" }} d="M720 44 V545" />
                <path className="dr" pathLength="1" style={{ "--d": "0.47s" }} d="M1032 44 V545" />
                <path className="dr" pathLength="1" style={{ "--d": "0.54s" }} d="M1344 44 V545" />
                <path className="dr" pathLength="1" style={{ "--d": "0.43s" }} d="M40 70 H1400" />
                <path className="dr" pathLength="1" style={{ "--d": "0.52s" }} d="M40 280 H1400" />
                <path className="dr" pathLength="1" style={{ "--d": "0.6s" }} d="M40 490 H1400" />
              </g>
            </mask>
          </defs>
          <g mask="url(#hbM)" stroke="#3B3A37" strokeWidth="1" strokeDasharray="18 5 2 5">
            <path d="M96 44 V545 M408 44 V545 M720 44 V545 M1032 44 V545 M1344 44 V545 M40 70 H1400 M40 280 H1400 M40 490 H1400" />
          </g>
          <g stroke="#3B3A37" strokeWidth="1">
            <circle className="fd" style={{ "--d": "0.38s" }} cx="96" cy="28" r="12" />
            <circle className="fd" style={{ "--d": "0.45s" }} cx="408" cy="28" r="12" />
            <circle className="fd" style={{ "--d": "0.52s" }} cx="720" cy="28" r="12" />
            <circle className="fd" style={{ "--d": "0.58s" }} cx="1032" cy="28" r="12" />
            <circle className="fd" style={{ "--d": "0.65s" }} cx="1344" cy="28" r="12" />
            <circle className="fd" style={{ "--d": "0.54s" }} cx="28" cy="70" r="12" />
            <circle className="fd" style={{ "--d": "0.63s" }} cx="28" cy="280" r="12" />
            <circle className="fd" style={{ "--d": "0.72s" }} cx="28" cy="490" r="12" />
          </g>
          <g fill="#4A4945" fontFamily="Martian Mono, monospace" fontSize="11" textAnchor="middle">
            <text className="fd" style={{ "--d": "0.38s" }} x="96" y="32">A</text>
            <text className="fd" style={{ "--d": "0.45s" }} x="408" y="32">B</text>
            <text className="fd" style={{ "--d": "0.52s" }} x="720" y="32">C</text>
            <text className="fd" style={{ "--d": "0.58s" }} x="1032" y="32">D</text>
            <text className="fd" style={{ "--d": "0.65s" }} x="1344" y="32">E</text>
            <text className="fd" style={{ "--d": "0.54s" }} x="28" y="74">1</text>
            <text className="fd" style={{ "--d": "0.63s" }} x="28" y="284">2</text>
            <text className="fd" style={{ "--d": "0.72s" }} x="28" y="494">3</text>
          </g>
          <g stroke="#3B3A37" strokeWidth="1.5" fill="#1E1E1D">
            <rect className="pc dr" pathLength="1" style={{ "--d": "0.79s" }} x="87" y="61" width="18" height="18" />
            <rect className="pc dr" pathLength="1" style={{ "--d": "0.82s" }} x="399" y="61" width="18" height="18" />
            <rect className="pc dr" pathLength="1" style={{ "--d": "0.86s" }} x="711" y="61" width="18" height="18" />
            <rect className="pc dr" pathLength="1" style={{ "--d": "0.89s" }} x="1023" y="61" width="18" height="18" />
            <rect className="pc dr" pathLength="1" style={{ "--d": "0.93s" }} x="1335" y="61" width="18" height="18" />
            <rect className="pc dr" pathLength="1" style={{ "--d": "0.85s" }} x="87" y="271" width="18" height="18" />
            <rect className="pc dr" pathLength="1" style={{ "--d": "0.89s" }} x="399" y="271" width="18" height="18" />
            <rect className="pc dr" pathLength="1" style={{ "--d": "0.92s" }} x="711" y="271" width="18" height="18" />
            <rect className="pc dr" pathLength="1" style={{ "--d": "0.96s" }} x="1023" y="271" width="18" height="18" />
            <rect className="pc dr" pathLength="1" style={{ "--d": "1s" }} x="1335" y="271" width="18" height="18" />
            <rect className="pc dr" pathLength="1" style={{ "--d": "0.92s" }} x="87" y="481" width="18" height="18" />
            <rect className="pc dr" pathLength="1" style={{ "--d": "0.96s" }} x="399" y="481" width="18" height="18" />
            <rect className="pc dr" pathLength="1" style={{ "--d": "0.99s" }} x="711" y="481" width="18" height="18" />
            <rect className="pc dr" pathLength="1" style={{ "--d": "1.03s" }} x="1023" y="481" width="18" height="18" />
            <rect className="pc dr" pathLength="1" style={{ "--d": "1.06s" }} x="1335" y="481" width="18" height="18" />
          </g>
          <g stroke="#2E2E2C" strokeWidth="1">
            <path className="dr" pathLength="1" style={{ "--d": "1.1s" }} d="M105 64 H399 M417 64 H711 M729 64 H1023 M1041 64 H1335 M105 76 H399 M417 76 H711 M729 76 H1023 M1041 76 H1335" />
            <path className="dr" pathLength="1" style={{ "--d": "1.19s" }} d="M105 274 H399 M417 274 H711 M729 274 H1023 M1041 274 H1335 M105 286 H399 M417 286 H711 M729 286 H1023 M1041 286 H1335" />
            <path className="dr" pathLength="1" style={{ "--d": "1.28s" }} d="M105 484 H399 M417 484 H711 M729 484 H1023 M1041 484 H1335 M105 496 H399 M417 496 H711 M729 496 H1023 M1041 496 H1335" />
          </g>
          <path className="dr" pathLength="1" style={{ "--d": "1.46s" }} d="M96 518 V542 M408 518 V542 M720 518 V542 M1032 518 V542 M1344 518 V542 M96 530 H1344 M90 536 L102 524 M402 536 L414 524 M714 536 L726 524 M1026 536 L1038 524 M1338 536 L1350 524" stroke="#3B3A37" strokeWidth="0.8" />
          <g className="fd" style={{ "--d": "1.59s" }} fill="#4A4945" fontFamily="Martian Mono, monospace" fontSize="12" textAnchor="middle">
            <text x="252" y="522">7.80</text>
            <text x="564" y="522">7.80</text>
            <text x="876" y="522">7.80</text>
            <text x="1188" y="522">7.80</text>
          </g>
        </svg>
        <h1 className="disp" style={{ position: "relative", margin: "0", fontSize: "clamp(48px, 11.5vw, 168px)", lineHeight: "0.92", letterSpacing: "0" }}>
          <span className="ln">
            <span style={{ animationDelay: "0.05s" }}>Espacios que se</span>
          </span>
          {" "}
          <span className="ln">
            <span style={{ animationDelay: "0.15s" }}>dibujan antes de</span>
          </span>
          {" "}
          <span className="ln">
            <span style={{ animationDelay: "0.25s", color: accent }}>construirse</span>
          </span>
        </h1>
      </div>
      <div className="hero-row" data-go={goAttr} style={{ display: "flex", flexWrap: "wrap", gap: "32px 48px", marginTop: "48px" }}>
        <div className="hero-plan" style={{ flex: "999 1 640px", minWidth: "0", display: "flex", flexDirection: "column", gap: "10px" }}>
          <div className="plan-scroll" role="region" aria-label="Planta baja" style={{ border: "1px solid #2A2A28", overflow: "hidden" }}>
            <div className="plan plan-c" onPointerMove={onMove} onPointerLeave={onLeave} style={{ position: "relative", aspectRatio: "1000 / 640", overflow: "hidden", cursor: "crosshair", backgroundColor: "#0B0B0B", backgroundImage: "linear-gradient(#151514 1px, transparent 1px), linear-gradient(90deg, #151514 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
              <svg data-plan="" role="img" aria-label="Planta baja de una vivienda de 18 por 10 metros: dos dormitorios, baño, guardado, acceso y estar-comedor-cocina integrados, con ejes, cotas y línea de corte A-A" viewBox="0 0 1000 640" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} fill="none">
                <defs>
                  <pattern id="hP" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="5" stroke="#F2F1EC" strokeWidth="1" />
                  </pattern>
                </defs>
                <g data-l="1" stroke="#6B6A66" strokeWidth="0.8">
                  <g fontFamily="Martian Mono, monospace" fontSize="11" textAnchor="middle">
                    <circle data-k="s" className="dr" pathLength="1" cx="140" cy="64" r="13" />
                    <text data-k="t" x="140" y="68" fill="#A3A29C" stroke="none">A</text>
                    <path data-k="cv" d="M140 77 V560" strokeDasharray="16 4 2 4" />
                    <circle data-k="s" className="dr" pathLength="1" cx="320" cy="64" r="13" />
                    <text data-k="t" x="320" y="68" fill="#A3A29C" stroke="none">B</text>
                    <path data-k="cv" d="M320 77 V560" strokeDasharray="16 4 2 4" />
                    <circle data-k="s" className="dr" pathLength="1" cx="500" cy="64" r="13" />
                    <text data-k="t" x="500" y="68" fill="#A3A29C" stroke="none">C</text>
                    <path data-k="cv" d="M500 77 V560" strokeDasharray="16 4 2 4" />
                    <circle data-k="s" className="dr" pathLength="1" cx="680" cy="64" r="13" />
                    <text data-k="t" x="680" y="68" fill="#A3A29C" stroke="none">D</text>
                    <path data-k="cv" d="M680 77 V560" strokeDasharray="16 4 2 4" />
                    <circle data-k="s" className="dr" pathLength="1" cx="860" cy="64" r="13" />
                    <text data-k="t" x="860" y="68" fill="#A3A29C" stroke="none">E</text>
                    <path data-k="cv" d="M860 77 V560" strokeDasharray="16 4 2 4" />
                    <circle data-k="s" className="dr" pathLength="1" cx="80" cy="120" r="13" />
                    <text data-k="t" x="80" y="124" fill="#A3A29C" stroke="none">1</text>
                    <path data-k="ch" d="M93 120 H906" strokeDasharray="16 4 2 4" />
                    <circle data-k="s" className="dr" pathLength="1" cx="80" cy="320" r="13" />
                    <text data-k="t" x="80" y="324" fill="#A3A29C" stroke="none">2</text>
                    <path data-k="ch" d="M93 320 H906" strokeDasharray="16 4 2 4" />
                    <circle data-k="s" className="dr" pathLength="1" cx="80" cy="520" r="13" />
                    <text data-k="t" x="80" y="524" fill="#A3A29C" stroke="none">3</text>
                    <path data-k="ch" d="M93 520 H906" strokeDasharray="16 4 2 4" />
                  </g>
                  <circle data-k="s" className="dr" pathLength="1" cx="44" cy="44" r="16" stroke="#A3A29C" />
                  <path data-k="o" d="M44 28 L50 52 L44 47 L38 52 Z" fill="#F2F1EC" stroke="none" />
                  <text data-k="t" x="44" y="20" fill="#A3A29C" stroke="none" fontFamily="Martian Mono, monospace" fontSize="10" textAnchor="middle">N</text>
                </g>
                <g data-l="2" stroke="#F2F1EC" strokeWidth="1.6">
                  <rect data-k="s" className="dr" pathLength="1" x="133" y="113" width="14" height="14" />
                  <rect data-k="f" x="133" y="113" width="14" height="14" fill="#F2F1EC" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="313" y="113" width="14" height="14" />
                  <rect data-k="f" x="313" y="113" width="14" height="14" fill="#F2F1EC" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="493" y="113" width="14" height="14" />
                  <rect data-k="f" x="493" y="113" width="14" height="14" fill="#F2F1EC" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="673" y="113" width="14" height="14" />
                  <rect data-k="f" x="673" y="113" width="14" height="14" fill="#F2F1EC" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="853" y="113" width="14" height="14" />
                  <rect data-k="f" x="853" y="113" width="14" height="14" fill="#F2F1EC" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="853" y="313" width="14" height="14" />
                  <rect data-k="f" x="853" y="313" width="14" height="14" fill="#F2F1EC" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="673" y="313" width="14" height="14" />
                  <rect data-k="f" x="673" y="313" width="14" height="14" fill="#F2F1EC" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="493" y="313" width="14" height="14" />
                  <rect data-k="f" x="493" y="313" width="14" height="14" fill="#F2F1EC" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="313" y="313" width="14" height="14" />
                  <rect data-k="f" x="313" y="313" width="14" height="14" fill="#F2F1EC" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="133" y="313" width="14" height="14" />
                  <rect data-k="f" x="133" y="313" width="14" height="14" fill="#F2F1EC" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="133" y="513" width="14" height="14" />
                  <rect data-k="f" x="133" y="513" width="14" height="14" fill="#F2F1EC" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="313" y="513" width="14" height="14" />
                  <rect data-k="f" x="313" y="513" width="14" height="14" fill="#F2F1EC" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="493" y="513" width="14" height="14" />
                  <rect data-k="f" x="493" y="513" width="14" height="14" fill="#F2F1EC" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="673" y="513" width="14" height="14" />
                  <rect data-k="f" x="673" y="513" width="14" height="14" fill="#F2F1EC" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="853" y="513" width="14" height="14" />
                  <rect data-k="f" x="853" y="513" width="14" height="14" fill="#F2F1EC" stroke="none" />
                </g>
                <g data-l="3" stroke="#F2F1EC" strokeWidth="2.2">
                  <rect data-k="s" className="dr" pathLength="1" x="134" y="114" width="56" height="12" />
                  <rect data-k="f" x="134" y="114" width="56" height="12" fill="url(#hP)" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="270" y="114" width="100" height="12" />
                  <rect data-k="f" x="270" y="114" width="100" height="12" fill="url(#hP)" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="450" y="114" width="100" height="12" />
                  <rect data-k="f" x="450" y="114" width="100" height="12" fill="url(#hP)" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="630" y="114" width="100" height="12" />
                  <rect data-k="f" x="630" y="114" width="100" height="12" fill="url(#hP)" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="810" y="114" width="56" height="12" />
                  <rect data-k="f" x="810" y="114" width="56" height="12" fill="url(#hP)" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="854" y="126" width="12" height="234" />
                  <rect data-k="f" x="854" y="126" width="12" height="234" fill="url(#hP)" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="854" y="460" width="12" height="54" />
                  <rect data-k="f" x="854" y="460" width="12" height="54" fill="url(#hP)" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="840" y="514" width="26" height="12" />
                  <rect data-k="f" x="840" y="514" width="26" height="12" fill="url(#hP)" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="316" y="514" width="204" height="12" />
                  <rect data-k="f" x="316" y="514" width="204" height="12" fill="url(#hP)" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="134" y="514" width="146" height="12" />
                  <rect data-k="f" x="134" y="514" width="146" height="12" fill="url(#hP)" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="134" y="270" width="12" height="244" />
                  <rect data-k="f" x="134" y="270" width="12" height="244" fill="url(#hP)" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="134" y="126" width="12" height="64" />
                  <rect data-k="f" x="134" y="126" width="12" height="64" fill="url(#hP)" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="317" y="126" width="6" height="191" />
                  <rect data-k="f" x="317" y="126" width="6" height="191" fill="url(#hP)" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="146" y="317" width="114" height="6" />
                  <rect data-k="f" x="146" y="317" width="114" height="6" fill="url(#hP)" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="296" y="317" width="124" height="6" />
                  <rect data-k="f" x="296" y="317" width="124" height="6" fill="url(#hP)" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="456" y="317" width="47" height="6" />
                  <rect data-k="f" x="456" y="317" width="47" height="6" fill="url(#hP)" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="497" y="126" width="6" height="191" />
                  <rect data-k="f" x="497" y="126" width="6" height="191" fill="url(#hP)" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="497" y="323" width="6" height="77" />
                  <rect data-k="f" x="497" y="323" width="6" height="77" fill="url(#hP)" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="257" y="323" width="6" height="17" />
                  <rect data-k="f" x="257" y="323" width="6" height="17" fill="url(#hP)" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="257" y="376" width="6" height="79" />
                  <rect data-k="f" x="257" y="376" width="6" height="79" fill="url(#hP)" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="257" y="491" width="6" height="23" />
                  <rect data-k="f" x="257" y="491" width="6" height="23" fill="url(#hP)" stroke="none" />
                  <rect data-k="s" className="dr" pathLength="1" x="146" y="427" width="111" height="6" />
                  <rect data-k="f" x="146" y="427" width="111" height="6" fill="url(#hP)" stroke="none" />
                </g>
                <g data-l="4" stroke="#F2F1EC" strokeWidth="1.1">
                  <path data-k="s" className="dr" pathLength="1" d="M190 118 H270 M190 122 H270" />
                  <path data-k="s" className="dr" pathLength="1" d="M370 118 H450 M370 122 H450" />
                  <path data-k="s" className="dr" pathLength="1" d="M550 118 H630 M550 122 H630" />
                  <path data-k="s" className="dr" pathLength="1" d="M730 118 H810 M730 122 H810" />
                  <path data-k="s" className="dr" pathLength="1" d="M858 360 V460 M862 360 V460" />
                  <path data-k="s" className="dr" pathLength="1" d="M840 518 H520 M840 522 H520 M760 514 V526 M680 514 V526 M600 514 V526" />
                  <path data-k="s" className="dr" pathLength="1" d="M280 514 L280 478 M316 514 A36 36 0 0 0 280 478" />
                  <path data-k="s" className="dr" pathLength="1" d="M138 270 V190 M142 270 V190" />
                  <path data-k="s" className="dr" pathLength="1" d="M260 317 L260 281 M296 317 A36 36 0 0 0 260 281" />
                  <path data-k="s" className="dr" pathLength="1" d="M456 317 L456 281 M420 317 A36 36 0 0 1 456 281" />
                  <path data-k="s" className="dr" pathLength="1" d="M257 340 L221 340 M257 376 A36 36 0 0 1 221 340" />
                  <path data-k="s" className="dr" pathLength="1" d="M257 455 L221 455 M257 491 A36 36 0 0 1 221 455" />
                </g>
                <g data-l="5" stroke="#A3A29C" strokeWidth="0.8">
                  <path data-k="s" className="dr" pathLength="1" d="M503 150 H854" />
                  <rect data-k="s" className="dr" pathLength="1" x="600" y="130" width="40" height="16" />
                  <rect data-k="s" className="dr" pathLength="1" x="700" y="130" width="40" height="16" />
                  <rect data-k="s" className="dr" pathLength="1" x="560" y="210" width="140" height="36" />
                  <rect data-k="s" className="dr" pathLength="1" x="740" y="196" width="80" height="64" />
                  <rect data-k="s" className="dr" pathLength="1" x="630" y="392" width="80" height="30" />
                  <rect data-k="s" className="dr" pathLength="1" x="580" y="446" width="180" height="32" />
                  <path data-k="s" className="dr" pathLength="1" d="M166 140 H246 V220 H166 Z M166 156 H246" />
                  <path data-k="s" className="dr" pathLength="1" d="M352 140 H432 V220 H352 Z M352 156 H432" />
                  <rect data-k="s" className="dr" pathLength="1" x="190" y="327" width="36" height="18" />
                  <ellipse data-k="s" className="dr" pathLength="1" cx="170" cy="345" rx="9" ry="12" />
                  <path data-k="s" className="dr" pathLength="1" d="M146 367 H206 V427 M146 367 L206 427 M206 367 L146 427" />
                  <rect data-k="ch" x="118" y="98" width="808" height="444" stroke="#6B6A66" strokeWidth="1" strokeDasharray="8 5" />
                </g>
                <g data-l="6" stroke="#A3A29C" strokeWidth="0.7">
                  <path data-k="s" className="dr" pathLength="1" d="M140 548 V612 M320 548 V588 M500 548 V588 M680 548 V588 M860 548 V612" />
                  <path data-k="s" className="dr" pathLength="1" d="M140 580 H860 M140 606 H860" />
                  <path data-k="s" className="dr" pathLength="1" d="M134 586 L146 574 M314 586 L326 574 M494 586 L506 574 M674 586 L686 574 M854 586 L866 574 M134 612 L146 600 M854 612 L866 600" />
                  <g fill="#A3A29C" stroke="none" fontFamily="Martian Mono, monospace" fontSize="11" textAnchor="middle">
                    <text data-k="t" x="230" y="572">4.50</text>
                    <text data-k="t" x="410" y="572">4.50</text>
                    <text data-k="t" x="590" y="572">4.50</text>
                    <text data-k="t" x="770" y="572">4.50</text>
                    <text data-k="t" x="500" y="600">18.00</text>
                  </g>
                  <path data-k="s" className="dr" pathLength="1" d="M934 120 H978 M934 320 H960 M934 520 H978" />
                  <path data-k="s" className="dr" pathLength="1" d="M952 120 V520 M974 120 V520" />
                  <path data-k="s" className="dr" pathLength="1" d="M946 126 L958 114 M946 326 L958 314 M946 526 L958 514 M968 126 L980 114 M968 526 L980 514" />
                  <g fill="#A3A29C" stroke="none" fontFamily="Martian Mono, monospace" fontSize="11" textAnchor="middle">
                    <text data-k="t" x="946" y="220" transform="rotate(-90 946 220)">5.00</text>
                    <text data-k="t" x="946" y="420" transform="rotate(-90 946 420)">5.00</text>
                    <text data-k="t" x="968" y="320" transform="rotate(-90 968 320)">10.00</text>
                  </g>
                  <g fill="#F2F1EC" stroke="none" fontFamily="Martian Mono, monospace" fontSize="11" textAnchor="middle">
                    <text data-k="t" x="231" y="250">DORMITORIO 1</text>
                    <text data-k="t" x="231" y="264" fill="#A3A29C">20.4 m²</text>
                    <text data-k="t" x="410" y="250">DORMITORIO 2</text>
                    <text data-k="t" x="410" y="264" fill="#A3A29C">20.8 m²</text>
                    <text data-k="t" x="620" y="186">COCINA</text>
                    <text data-k="t" x="780" y="290">COMEDOR</text>
                    <text data-k="t" x="790" y="400">ESTAR</text>
                    <text data-k="t" x="790" y="414" fill="#A3A29C">85.1 m²</text>
                    <text data-k="t" x="380" y="440">ACCESO</text>
                    <text data-k="t" x="380" y="454" fill="#A3A29C">N.P.T. ±0.00</text>
                    <text data-k="t" x="231" y="400">BAÑO</text>
                    <text data-k="t" x="231" y="414" fill="#A3A29C">7.2 m²</text>
                    <text data-k="t" x="183" y="476">GUARDADO</text>
                    <text data-k="t" x="183" y="490" fill="#A3A29C">5.6 m²</text>
                    <text data-k="t" x="140" y="634" textAnchor="start" fill="#A3A29C">PLANTA BAJA · ESC. 1:100</text>
                  </g>
                </g>
                <g data-l="7">
                  <path data-k="s" className="dr" pathLength="1" d="M100 420 H124" stroke={accent} strokeWidth="3" />
                  <path data-k="ch" d="M124 420 H876" stroke={accent} strokeWidth="1.2" strokeDasharray="24 6 4 6" />
                  <path data-k="s" className="dr" pathLength="1" d="M876 420 H900" stroke={accent} strokeWidth="3" />
                  <path data-k="o" d="M112 398 L118 410 L106 410 Z M888 398 L894 410 L882 410 Z" fill={accent} />
                  <g fill={accent} fontFamily="Martian Mono, monospace" fontSize="12" textAnchor="middle">
                    <text data-k="t" x="112" y="392">A</text>
                    <text data-k="t" x="888" y="392">A</text>
                  </g>
                </g>
                <g data-pen="" opacity="0" style={{ pointerEvents: "none" }}>
                  <circle cx="0" cy="0" r="6" stroke={accent} strokeWidth="1.5" />
                  <path d="M-14 0 H-8 M8 0 H14 M0 -14 V-8 M0 8 V14" stroke={accent} strokeWidth="1" />
                  <circle cx="0" cy="0" r="1.6" fill={accent} />
                </g>
              </svg>
              <div className="xh xv" aria-hidden="true" style={{ position: "absolute", top: "0", bottom: "0", left: "0", width: "0", borderLeft: "1px dashed #8C8B86" }} />
              <div className="xh xz" aria-hidden="true" style={{ position: "absolute", left: "0", right: "0", top: "0", height: "0", borderTop: "1px dashed #8C8B86" }} />
              <div className="xh tip mono" data-tip="" data-v="" aria-hidden="true" style={{ position: "absolute", left: "0", top: "0", fontSize: "11px", letterSpacing: "0.04em", background: "#F2F1EC", color: "#0B0B0B", padding: "6px 8px", whiteSpace: "nowrap" }} />
            </div>
          </div>
        </div>
        <aside className="hero-aside" style={{ flex: "1 1 300px", minWidth: "0", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "32px" }}>
          <p className="fi hero-lead" style={{ margin: "0", fontSize: "21px", lineHeight: "1.45", color: "#C9C8C2" }}>Proyectamos y calculamos viviendas, interiores y edificios con rigor técnico y sensibilidad material. Del primer croquis a la entrega de llaves, con el mismo equipo.</p>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", paddingBottom: "4px" }}>
              <span className="mono" style={{ fontSize: "12px", letterSpacing: "0.06em", color: "#A3A29C" }}>TRAZADO</span>
              {" "}
              <span className="disp" style={{ fontSize: "67px", lineHeight: "0.8" }}>
                <span className="count" aria-hidden="true" />
                <span style={{ color: accent }}>%</span>
              </span>
            </div>
            <label className="sr" htmlFor="scrub">Avance del trazado</label>
            {" "}
            <input id="scrub" className="scrub" type="range" min="0" max="1000" step="1" onInput={onScrub} onPointerDown={onScrubStart} onPointerUp={onScrubEnd} />
            <div className="mono" style={{ display: "flex", gap: "8px", margin: "10px 0 14px", fontSize: "11px", letterSpacing: "0.06em" }}>
              <button className="ctl" type="button" onClick={onToggle}>{playLabel}</button>
              {" "}
              <button className="ctl" type="button" onClick={onReplay}>VOLVER A VER</button>
            </div>
            <ol className="lg mono" aria-label="Capas del plano" style={{ listStyle: "none", margin: "0", padding: "0", fontSize: "11px", letterSpacing: "0.04em", borderTop: "1px solid #2A2A28" }}>
              {layers.map((l, l_i) => (
                  <li key={l_i} data-li={l.i} data-state="done" style={{ borderBottom: "1px solid #1E1E1D" }}>
                    <button className="lgb" type="button" onClick={l.go}>
                      <span className="lgn">
                        <span className="sr">Dibujar desde la capa{" "}</span>
                        {l.n}
                      </span>
                      {" "}
                      <svg aria-hidden="true" width="44" height="8" viewBox="0 0 44 8">
                        <line className={l.cls} pathLength="1" x1="0" y1="4" x2="44" y2="4" stroke={l.color} strokeWidth={l.sw} strokeDasharray={l.dash} />
                      </svg>
                      {" "}
                      <span className="lgname">{l.name}</span>
                      {" "}
                      <span style={{ color: "#A3A29C" }}>{l.w}</span>
                    </button>
                  </li>
              ))}
            </ol>
          </div>
          <a className="cta mono hero-cta" href="#proyectos" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: "14px", minHeight: "48px", padding: "0 22px", border: "1px solid #F2F1EC", fontSize: "12px", letterSpacing: "0.08em" }}>
            VER PROYECTOS{" "}
            <svg className="arr" aria-hidden="true" width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M0 6 H16 M11 1 L16 6 L11 11" />
            </svg>
          </a>
        </aside>
      </div>
    </section>
  );
}
