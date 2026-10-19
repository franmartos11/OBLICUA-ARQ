import { ACCENT } from '@/lib/config';

export default function SectionIndicator() {
  const accent = ACCENT;

  return (
    <div className="ind mono" aria-hidden="true" style={{ position: "fixed", left: "16px", bottom: "16px", zIndex: "50", alignItems: "center", gap: "12px", background: "#0B0B0B", border: "1px solid #2A2A28", padding: "10px 14px", fontSize: "11px", letterSpacing: "0.08em" }}>
      <span style={{ position: "relative", display: "block", width: "140px", height: "14px" }}>
        <span className="ind-l i1" style={{ position: "absolute", inset: "0" }}>01 — ESTUDIO</span>
        {" "}
        <span className="ind-l i2" style={{ position: "absolute", inset: "0" }}>02 — SERVICIOS</span>
        {" "}
        <span className="ind-l i3" style={{ position: "absolute", inset: "0" }}>03 — PROYECTOS</span>
        {" "}
        <span className="ind-l i4" style={{ position: "absolute", inset: "0" }}>04 — MÉTODO</span>
        {" "}
        <span className="ind-l i5" style={{ position: "absolute", inset: "0" }}>05 — PREGUNTAS</span>
        {" "}
        <span className="ind-l i6" style={{ position: "absolute", inset: "0" }}>06 — CONTACTO</span>
      </span>
      {" "}
      <span className="ind-track" style={{ display: "block", width: "64px", height: "1px", background: "#3B3A37" }}>
        <span className="ind-bar" style={{ display: "block", height: "1px", background: accent }} />
      </span>
    </div>
  );
}
