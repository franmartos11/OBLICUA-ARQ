'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ACCENT } from '@/lib/config';
import { STEPS } from '@/lib/data';
import { Tracer, playLabel as labelFor, status, type TracerStatus } from '@/lib/tracer';

export default function Method() {
  const accent = ACCENT;
  const rootRef = useRef<HTMLElement>(null);
  const cut = useRef<Tracer | null>(null);
  const [c, setC] = useState<TracerStatus>('idle');

  useEffect(() => {
    const root = rootRef.current;
    const svg = root?.querySelector<SVGSVGElement>('svg[data-cut]');
    const stage = root?.querySelector<HTMLElement>('.stage');
    if (!root || !svg || !stage) return;
    const reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const tr = new Tracer({
      svg,
      pen: svg.querySelector<SVGGElement>('[data-pen]'),
      reduce,
      gap: 150,
      id: 'corte',
      scrubEl: root.querySelector<HTMLInputElement>('#scrub2'),
      scroller: root.querySelector<HTMLElement>('.stage-scroll'),
      lis: Array.from(root.querySelectorAll<HTMLElement>('.pasos li[data-li]')),
      budget: [0, 800, 1400, 1400, 600],
      getEls: (l) => Array.from(stage.querySelectorAll('[data-s="' + l + '"]')),
      onChange: (p, e, t) => setC(status(p, e, t)),
    });
    try {
      tr.build();
    } catch {
      tr.items = [];
    }
    const narrow = !!(window.matchMedia && window.matchMedia('(max-width: 760px)').matches);
    // Igual que la planta del hero: se dibuja al bajar y se repite en cada pasada.
    tr.observeOnScroll(narrow ? stage : root.querySelector('.stage-wrap') || stage, narrow ? 0.45 : 0.6);
    svg.setAttribute('data-ready', '');
    cut.current = tr;
    return () => {
      tr.destroy();
      cut.current = null;
    };
  }, []);

  const onToggle2 = () => cut.current?.toggle();
  const onReplay2 = () => cut.current?.replay();
  const onScrub2Start = () => cut.current?.scrubStart();
  const onScrub2End = () => cut.current?.scrubEnd();
  const onScrub2 = (e: FormEvent<HTMLInputElement>) => cut.current?.scrubTo(Number(e.currentTarget.value) / 1000);

  const steps = STEPS.map((s, i) => ({ ...s, i: String(i + 1), go: () => cut.current?.goLayer(i) }));
  const playLabel2 = labelFor(c);
  return (
    <section ref={rootRef} id="metodo" style={{ borderTop: "1px solid #2A2A28" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(80px, 11vw, 160px) clamp(16px, 4vw, 48px)", boxSizing: "border-box" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "48px" }}>
          <h2 className="disp mk" style={{ margin: "0", fontSize: "clamp(50px, 8vw, 120px)", lineHeight: "0.88" }}>
            <span>Cómo trabajamos</span>
          </h2>
          <p className="rv" style={{ margin: "0", maxWidth: "420px", fontSize: "17px", lineHeight: "1.55", color: "#A3A29C" }}>Cuatro etapas, cada una con un entregable claro. Avanzamos a la siguiente solo cuando la anterior está aprobada.</p>
        </div>
        <div className="stage-wrap" style={{ display: "flex", flexWrap: "wrap", gap: "40px 48px", alignItems: "flex-start" }}>
          <div className="stage" style={{ flex: "999 1 640px", minWidth: "0", border: "1px solid #2A2A28", display: "flex", flexDirection: "column" }}>
            <div className="stage-scroll" role="region" aria-label="Corte A-A">
              <div className="stage-c" style={{ position: "relative", aspectRatio: "960 / 300" }}>
                <svg data-cut="" role="img" aria-label="De la vista sur al corte A-A de la vivienda: platea, muros y losa cortados con rayado, carpinterías en proyección, niveles, cotas y figura humana de escala" viewBox="40 226 960 300" style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }} fill="none">
                  <defs>
                    <pattern id="hC" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                      <line x1="0" y1="0" x2="0" y2="5" stroke="#F2F1EC" strokeWidth="1" />
                    </pattern>
                    <pattern id="eaC" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
                      <line x1="0" y1="0" x2="0" y2="10" stroke="#3B3A37" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <path data-s="1" data-k="s" className="dr" pathLength="1" d="M0 400 H134 M866 400 H1000" stroke="#6B6A66" strokeWidth="1" />
                  <rect data-s="1" data-k="f" x="0" y="400" width="134" height="24" fill="url(#eaC)" />
                  <rect data-s="1" data-k="f" x="866" y="400" width="134" height="24" fill="url(#eaC)" />
                  <rect data-s="1" data-k="f" x="134" y="412" width="732" height="12" fill="url(#eaC)" />
                  <g data-s="2" data-k="x" stroke="#F2F1EC" strokeWidth="1.2">
                    <path data-s="1" data-k="s" className="dr" pathLength="1" d="M134 400 V272 H926 V282 H866 V400" />
                    <path data-s="1" data-k="s" className="dr" pathLength="1" d="M134 282 H866" />
                    <rect data-s="1" data-k="s" className="dr" pathLength="1" x="280" y="316" width="36" height="84" />
                    <path data-s="1" data-k="s" className="dr" pathLength="1" d="M520 400 V296 H840 V400" />
                    <path data-s="1" data-k="s" className="dr" pathLength="1" d="M600 296 V400 M680 296 V400 M760 296 V400" />
                  </g>
                  <g stroke="#F2F1EC" strokeWidth="2.2">
                    <rect data-s="2" data-k="s" className="dr" pathLength="1" x="134" y="400" width="732" height="12" />
                    <rect data-s="2" data-k="f" x="134" y="400" width="732" height="12" fill="url(#hC)" stroke="none" />
                    <rect data-s="2" data-k="s" className="dr" pathLength="1" x="134" y="282" width="12" height="118" />
                    <rect data-s="2" data-k="f" x="134" y="282" width="12" height="118" fill="url(#hC)" stroke="none" />
                    <rect data-s="2" data-k="s" className="dr" pathLength="1" x="134" y="272" width="792" height="10" />
                    <rect data-s="2" data-k="f" x="134" y="272" width="792" height="10" fill="url(#hC)" stroke="none" />
                    <rect data-s="2" data-k="s" className="dr" pathLength="1" x="854" y="282" width="12" height="22" />
                    <rect data-s="2" data-k="f" x="854" y="282" width="12" height="22" fill="url(#hC)" stroke="none" />
                    <rect data-s="2" data-k="s" className="dr" pathLength="1" x="854" y="364" width="12" height="36" />
                    <rect data-s="2" data-k="f" x="854" y="364" width="12" height="36" fill="url(#hC)" stroke="none" />
                    <rect data-s="2" data-k="s" className="dr" pathLength="1" x="257" y="282" width="6" height="118" />
                    <rect data-s="2" data-k="f" x="257" y="282" width="6" height="118" fill="url(#hC)" stroke="none" />
                  </g>
                  <path data-s="2" data-k="s" className="dr" pathLength="1" d="M858 304 V364 M862 304 V364" stroke="#F2F1EC" strokeWidth="1" />
                  <g stroke="#A3A29C" strokeWidth="0.9">
                    <rect data-s="3" data-k="s" className="dr" pathLength="1" x="260" y="316" width="36" height="84" />
                    <rect data-s="3" data-k="s" className="dr" pathLength="1" x="420" y="316" width="36" height="84" />
                    <path data-s="3" data-k="s" className="dr" pathLength="1" d="M497 400 V282 M503 400 V282" />
                    <rect data-s="3" data-k="s" className="dr" pathLength="1" x="550" y="304" width="80" height="52" />
                    <path data-s="3" data-k="s" className="dr" pathLength="1" d="M674 400 V282 M686 400 V282" />
                    <rect data-s="3" data-k="s" className="dr" pathLength="1" x="730" y="304" width="80" height="52" />
                    <rect data-s="3" data-k="s" className="dr" pathLength="1" x="503" y="364" width="351" height="36" />
                    <rect data-s="3" data-k="s" className="dr" pathLength="1" x="560" y="364" width="140" height="36" fill="#0B0B0B" />
                  </g>
                  <g stroke="#A3A29C" strokeWidth="0.7">
                    <path data-s="3" data-k="s" className="dr" pathLength="1" d="M56 400 H128 M64 390 L76 390 L70 400 Z" />
                    <text data-s="3" data-k="t" x="80" y="396" fill="#A3A29C" stroke="none" fontFamily="Martian Mono, monospace" fontSize="11">±0.00</text>
                    <path data-s="3" data-k="s" className="dr" pathLength="1" d="M56 272 H128 M64 262 L76 262 L70 272 Z" />
                    <text data-s="3" data-k="t" x="80" y="268" fill="#A3A29C" stroke="none" fontFamily="Martian Mono, monospace" fontSize="11">+3.20</text>
                    <path data-s="3" data-k="s" className="dr" pathLength="1" d="M932 400 H966 M932 282 H966 M932 272 H966" />
                    <path data-s="3" data-k="s" className="dr" pathLength="1" d="M960 272 V400" />
                    <path data-s="3" data-k="s" className="dr" pathLength="1" d="M954 406 L966 394 M954 288 L966 276 M954 278 L966 266" />
                    <text data-s="3" data-k="t" x="954" y="341" textAnchor="middle" transform="rotate(-90 954 341)" fill="#A3A29C" stroke="none" fontFamily="Martian Mono, monospace" fontSize="11">2.95</text>
                    <text data-s="3" data-k="t" x="938" y="264" fill="#A3A29C" stroke="none" fontFamily="Martian Mono, monospace" fontSize="11">0.25</text>
                    <path data-s="3" data-k="s" className="dr" pathLength="1" d="M140 432 V476 M860 432 V476 M926 288 V476" />
                    <path data-s="3" data-k="s" className="dr" pathLength="1" d="M140 466 H926" />
                    <path data-s="3" data-k="s" className="dr" pathLength="1" d="M134 472 L146 460 M854 472 L866 460 M920 472 L932 460" />
                    <text data-s="3" data-k="t" x="500" y="460" textAnchor="middle" fill="#A3A29C" stroke="none" fontFamily="Martian Mono, monospace" fontSize="11">18.00</text>
                    <text data-s="3" data-k="t" x="893" y="460" textAnchor="middle" fill="#A3A29C" stroke="none" fontFamily="Martian Mono, monospace" fontSize="11">1.65</text>
                  </g>
                  <g fill="#F2F1EC" fontFamily="Martian Mono, monospace" fontSize="11" textAnchor="middle">
                    <text data-s="4" data-k="t" x="200" y="350">BAÑO</text>
                    <text data-s="4" data-k="t" x="380" y="300">ACCESO</text>
                    <text data-s="4" data-k="t" x="600" y="297">COCINA</text>
                    <text data-s="4" data-k="t" x="780" y="297">ESTAR</text>
                  </g>
                  <g stroke="#C9C8C2" strokeWidth="1">
                    <circle data-s="4" data-k="s" className="dr" pathLength="1" cx="770" cy="334" r="4.5" />
                    <path data-s="4" data-k="s" className="dr" pathLength="1" d="M770 339 V368 M770 368 L764 400 M770 368 L776 400 M770 346 L762 362 M770 346 L778 362" />
                  </g>
                  <text data-s="4" data-k="t" x="134" y="506" fill="#A3A29C" fontFamily="Martian Mono, monospace" fontSize="11">CORTE A–A · ESC. 1:100</text>
                  <g data-pen="" opacity="0" style={{ pointerEvents: "none" }}>
                    <circle cx="0" cy="0" r="6" stroke={accent} strokeWidth="1.5" />
                    <path d="M-14 0 H-8 M8 0 H14 M0 -14 V-8 M0 8 V14" stroke={accent} strokeWidth="1" />
                    <circle cx="0" cy="0" r="1.6" fill={accent} />
                  </g>
                </svg>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", borderTop: "1px solid #2A2A28", padding: "12px" }}>
              <span className="mono" style={{ position: "relative", display: "block", width: "120px", height: "24px", fontSize: "11px", letterSpacing: "0.06em" }}>
                <span data-s="1" data-k="o" style={{ position: "absolute", left: "0", top: "4px", whiteSpace: "nowrap" }}>
                  <span data-s="2" data-k="x" style={{ display: "inline-block" }}>VISTA SUR</span>
                </span>
                {" "}
                <span data-s="2" data-k="o" style={{ position: "absolute", left: "0", top: "4px", whiteSpace: "nowrap", color: accent }}>CORTE A–A</span>
              </span>
              {" "}
              <svg aria-hidden="true" viewBox="0 0 1000 640" style={{ width: "96px", height: "auto", display: "block" }} fill="none">
                <path data-s="1" data-k="s" data-nopen="" className="dr" pathLength="1" d="M134 114 H866 V526 H134 Z M320 120 V320 M146 320 H500 M500 120 V400 M260 323 V514" stroke="#8C8B86" strokeWidth="14" />
                <g data-s="2" data-k="m" data-dy="130">
                  <path data-s="1" data-k="o" d="M60 420 H940" stroke={accent} strokeWidth="18" strokeDasharray="60 20" />
                </g>
              </svg>
            </div>
            <div className="mono" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "8px 12px", borderTop: "1px solid #2A2A28", padding: "8px 12px", fontSize: "11px", letterSpacing: "0.06em" }}>
              <label className="sr" htmlFor="scrub2">Avance del método</label>
              {" "}
              <input id="scrub2" className="scrub" type="range" min="0" max="1000" step="1" style={{ flex: "1 1 160px", width: "auto" }} onInput={onScrub2} onPointerDown={onScrub2Start} onPointerUp={onScrub2End} />
              {" "}
              <button className="ctl" type="button" onClick={onToggle2}>{playLabel2}</button>
              {" "}
              <button className="ctl" type="button" onClick={onReplay2}>VOLVER A VER</button>
            </div>
          </div>
          <ol className="pasos" style={{ flex: "1 1 300px", minWidth: "0", listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "28px" }}>
            {steps.map((st, st_i) => (
                <li key={st_i} className="step" data-li={st.i} data-state="done" style={{ borderTop: "1px solid #F2F1EC", paddingTop: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span className="disp sn" style={{ fontSize: "50px", lineHeight: "0.85" }}>{st.n}</span>
                    {" "}
                    <span className="mono" style={{ fontSize: "11px", letterSpacing: "0.06em", color: "#8C8B86" }}>{st.tag}</span>
                  </div>
                  <h3 className="disp" style={{ margin: "6px 0 2px", fontSize: "28px", lineHeight: "1" }}>
                    <button className="stb" type="button" onClick={st.go}>
                      <span className="sr">Ver la etapa{" "}</span>
                      {st.title}
                    </button>
                  </h3>
                  <p className="stx" style={{ margin: "0", fontSize: "16px", lineHeight: "1.5", color: "#A3A29C" }}>{st.text}</p>
                  <p className="mono sdl" style={{ margin: "10px 0 0", fontSize: "11px", letterSpacing: "0.04em", lineHeight: "1.6", color: "#C9C8C2" }}>ENTREGABLE — {st.del}</p>
                </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
