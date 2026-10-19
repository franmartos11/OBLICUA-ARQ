'use client';

import { useEffect, useRef, useState } from 'react';
import { ACCENT } from '@/lib/config';
import { PROJECTS } from '@/lib/data';

export default function Projects() {
  const accent = ACCENT;
  const rootRef = useRef<HTMLElement>(null);
  const [hov, setHov] = useState(0);

  // En escritorio, la fila que cruza el centro de la pantalla pasa a ser el proyecto activo.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const rows = Array.from(root.querySelectorAll('.prow'));
    const side = root.querySelector<HTMLElement>('.p-side');
    if (!rows.length || !side || typeof IntersectionObserver === 'undefined') return;
    const pio = new IntersectionObserver(
      (entries) => {
        if (!side.offsetParent) return;
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const i = rows.indexOf(en.target);
          if (i >= 0) setHov(i);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    rows.forEach((r) => pio.observe(r));
    return () => pio.disconnect();
  }, []);

  const projects = PROJECTS.map((p, i) => ({
    ...p,
    color: i === hov ? '#F2F1EC' : '#8C8B86',
    numColor: i === hov ? accent : '#8C8B86',
    clip: i === hov ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)',
    z: i === hov ? 2 : 1,
    hidden: (i === hov ? 'false' : 'true') as 'true' | 'false',
    hover: () => setHov(i),
  }));
  const cur = projects[hov];
  return (
    <section ref={rootRef} id="proyectos" style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 48px) clamp(80px, 11vw, 160px)", boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "48px" }}>
        <h2 className="disp mk" style={{ margin: "0", fontSize: "clamp(50px, 8vw, 120px)", lineHeight: "0.88" }}>
          <span>Proyectos</span>
        </h2>
        <p className="rv" style={{ margin: "0", maxWidth: "420px", fontSize: "17px", lineHeight: "1.55", color: "#A3A29C" }}>Cada obra parte de una pregunta distinta. Estas son algunas de las respuestas.</p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "48px" }}>
        <div style={{ flex: "999 1 560px", minWidth: "0", borderTop: "1px solid #2A2A28" }}>
          {projects.map((p, p_i) => (
              <a key={p_i} className="prow" href="#contacto" onMouseEnter={p.hover} onFocus={p.hover} style={{ display: "grid", gridTemplateColumns: "40px minmax(0, 1fr) auto", alignItems: "center", gap: "16px", padding: "24px 0", borderBottom: "1px solid #2A2A28", color: p.color }}>
                <span className="p-thumb" style={{ position: "relative", gridColumn: "1 / -1", aspectRatio: "16 / 9", border: "1px solid #2A2A28", background: "#121211" }}>
                  <svg viewBox="0 0 400 300" aria-hidden="true" style={{ position: "absolute", top: "8px", left: "8px", width: "calc(100% - 16px)", height: "calc(100% - 16px)" }} fill="none" strokeLinecap="round">
                    <path className="dr pd" pathLength="1" d={p.art.ctx} stroke="#6B6A66" strokeWidth="0.8" />
                    <path className="dr pd" pathLength="1" d={p.art.vol} stroke="#F2F1EC" strokeWidth="1.3" />
                    <path className="dr pd" pathLength="1" d={p.art.hat} stroke="#3B3A37" strokeWidth="0.6" />
                    <path className="dr pd" pathLength="1" d={p.art.win} stroke="#A3A29C" strokeWidth="0.8" />
                  </svg>
                </span>
                {" "}
                <span className="mono" style={{ fontSize: "12px", color: p.numColor }}>{p.n}</span>
                {" "}
                <span>
                  <span className="disp" style={{ display: "block", fontSize: "clamp(28px, 3vw, 44px)", lineHeight: "1" }}>{p.name}</span>
                  {" "}
                  <span style={{ display: "block", marginTop: "8px", fontSize: "16px", lineHeight: "1.45", color: "#A3A29C" }}>{p.desc}</span>
                  {" "}
                  <span className="mono" style={{ display: "block", marginTop: "8px", fontSize: "11px", letterSpacing: "0.04em", color: "#8C8B86" }}>{p.type} · {p.loc} · {p.year}</span>
                </span>
                {" "}
                <svg className="arr" aria-hidden="true" width="22" height="14" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M0 6 H16 M11 1 L16 6 L11 11" />
                </svg>
              </a>
          ))}
        </div>
        <div className="p-side" style={{ flex: "1 1 360px", minWidth: "0", position: "sticky", top: "32px", alignSelf: "flex-start" }}>
          <div style={{ position: "relative", aspectRatio: "4 / 3", border: "1px solid #2A2A28", background: "#0B0B0B", overflow: "hidden" }}>
            {projects.map((p, p_i) => (
                <div key={p_i} className="pv" aria-hidden={p.hidden} style={{ position: "absolute", inset: "0", zIndex: p.z, clipPath: p.clip, background: "#121211", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", textAlign: "center", padding: "24px", boxSizing: "border-box" }}>
                  <svg viewBox="0 0 400 300" aria-hidden="true" style={{ position: "absolute", top: "16px", left: "16px", width: "calc(100% - 32px)", height: "calc(100% - 64px)" }} fill="none" strokeLinecap="round">
                    <path className="dr pd" pathLength="1" d={p.art.ctx} stroke="#6B6A66" strokeWidth="0.8" style={{ "--d": "0s" }} />
                    <path className="dr pd" pathLength="1" d={p.art.vol} stroke="#F2F1EC" strokeWidth="1.3" style={{ "--d": "0.05s" }} />
                    <path className="dr pd" pathLength="1" d={p.art.hat} stroke="#3B3A37" strokeWidth="0.6" style={{ "--d": "0.45s" }} />
                    <path className="dr pd" pathLength="1" d={p.art.win} stroke="#A3A29C" strokeWidth="0.8" style={{ "--d": "0.6s" }} />
                  </svg>
                  <div className="mono" style={{ position: "absolute", left: "16px", right: "16px", bottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px", fontSize: "11px", letterSpacing: "0.06em", color: "#A3A29C", textTransform: "uppercase", textAlign: "left" }}>
                    <span>Axonometría · {p.name}</span>
                    <span className="disp" style={{ fontSize: "28px", lineHeight: "1", letterSpacing: "0", color: accent }}>{p.n}</span>
                  </div>
                </div>
            ))}
          </div>
          <dl className="mono" style={{ margin: "0", display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1px", background: "#2A2A28", border: "1px solid #2A2A28", borderTop: "0", fontSize: "11px", letterSpacing: "0.04em" }}>
            <div style={{ background: "#0B0B0B", padding: "14px" }}>
              <dt style={{ color: "#8C8B86" }}>TIPOLOGÍA</dt>
              <dd style={{ margin: "4px 0 0" }}>{cur.type}</dd>
            </div>
            <div style={{ background: "#0B0B0B", padding: "14px" }}>
              <dt style={{ color: "#8C8B86" }}>SUPERFICIE</dt>
              <dd style={{ margin: "4px 0 0" }}>{cur.area}</dd>
            </div>
            <div style={{ background: "#0B0B0B", padding: "14px" }}>
              <dt style={{ color: "#8C8B86" }}>UBICACIÓN</dt>
              <dd style={{ margin: "4px 0 0" }}>{cur.loc}</dd>
            </div>
            <div style={{ background: "#0B0B0B", padding: "14px" }}>
              <dt style={{ color: "#8C8B86" }}>ESTADO</dt>
              <dd style={{ margin: "4px 0 0" }}>{cur.status}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
