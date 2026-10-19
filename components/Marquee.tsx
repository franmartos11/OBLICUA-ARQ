import { ACCENT } from '@/lib/config';

export default function Marquee() {
  const accent = ACCENT;

  return (
    <div aria-hidden="true" style={{ borderTop: "1px solid #2A2A28", borderBottom: "1px solid #2A2A28", padding: "20px 0", overflow: "hidden", display: "flex", flexDirection: "column", gap: "8px" }}>
      <div className="mq disp" style={{ fontSize: "clamp(50px, 7.5vw, 120px)", lineHeight: "1", gap: "48px" }}>
        <span>Vivienda</span>
        <span style={{ color: accent }}>+</span>
        <span className="outline">Interiorismo</span>
        <span style={{ color: accent }}>+</span>
        <span>Ingeniería</span>
        <span style={{ color: accent }}>+</span>
        <span className="outline">Rehabilitación</span>
        <span style={{ color: accent }}>+</span>
        {" "}
        <span>Vivienda</span>
        <span style={{ color: accent }}>+</span>
        <span className="outline">Interiorismo</span>
        <span style={{ color: accent }}>+</span>
        <span>Ingeniería</span>
        <span style={{ color: accent }}>+</span>
        <span className="outline">Rehabilitación</span>
        <span style={{ color: accent }}>+</span>
      </div>
      <div className="mq mq2 disp" style={{ fontSize: "clamp(38px, 5vw, 80px)", lineHeight: "1", gap: "40px", color: "#6B6A66" }}>
        <span>Plantas</span>
        <span>/</span>
        <span>Cortes</span>
        <span>/</span>
        <span>Detalles</span>
        <span>/</span>
        <span>Maquetas</span>
        <span>/</span>
        <span>Obra</span>
        <span>/</span>
        {" "}
        <span>Plantas</span>
        <span>/</span>
        <span>Cortes</span>
        <span>/</span>
        <span>Detalles</span>
        <span>/</span>
        <span>Maquetas</span>
        <span>/</span>
        <span>Obra</span>
        <span>/</span>
        {" "}
        <span>Plantas</span>
        <span>/</span>
        <span>Cortes</span>
        <span>/</span>
        <span>Detalles</span>
        <span>/</span>
        <span>Maquetas</span>
        <span>/</span>
        <span>Obra</span>
        <span>/</span>
      </div>
    </div>
  );
}
