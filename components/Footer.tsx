import { ACCENT } from '@/lib/config';

export default function Footer() {
  const accent = ACCENT;

  return (
    <footer style={{ borderTop: "1px solid #2A2A28" }}>
      <div className="mono nav foot" style={{ maxWidth: "1440px", margin: "0 auto", padding: "48px clamp(16px, 4vw, 48px) 40px", boxSizing: "border-box", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "32px", fontSize: "11px", letterSpacing: "0.04em", lineHeight: "2.1" }}>
        <div>
          <span style={{ color: "#8C8B86" }}>ESTUDIO</span>
          <br />
          Humboldt 1550, of. 4
          <br />
          Palermo, Buenos Aires
        </div>
        <div>
          <span style={{ color: "#8C8B86" }}>NAVEGAR</span>
          <br />
          <a href="#estudio">Estudio</a>
          <br />
          <a href="#proyectos">Proyectos</a>
          <br />
          <a href="#metodo">Método</a>
          <br />
          <a href="#preguntas">Preguntas</a>
        </div>
        <div>
          <span style={{ color: "#8C8B86" }}>SEGUINOS</span>
          <br />
          <a href="#contacto">Instagram</a>
          <br />
          <a href="#contacto">LinkedIn</a>
          <br />
          <a href="#contacto">Behance</a>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "16px" }}>
          <span style={{ color: "#8C8B86" }}>© 2026 Oblicua Arquitectura · Mat. CPAU 31.457</span>
          <a href="#top">VOLVER ARRIBA</a>
        </div>
      </div>
      <div className="wm-box" aria-hidden="true" style={{ maxWidth: "1440px", margin: "0 auto", padding: "0 clamp(16px, 4vw, 48px) 24px", boxSizing: "border-box", overflow: "hidden" }}>
        <div className="disp wm" style={{ fontSize: "clamp(40px, 16.5vw, 290px)", lineHeight: "0.78", whiteSpace: "nowrap" }}>
          OBLICUA
          <span style={{ color: accent }}>/</span>
          ARQ
        </div>
      </div>
    </footer>
  );
}
