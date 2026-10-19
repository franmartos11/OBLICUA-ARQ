
export default function Estudio() {

  return (
    <section id="estudio" style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(96px, 13vw, 192px) clamp(16px, 4vw, 48px) clamp(64px, 9vw, 120px)", boxSizing: "border-box" }}>
      <p className="disp" style={{ margin: "0", maxWidth: "1200px", fontSize: "clamp(38px, 5.6vw, 90px)", lineHeight: "0.95" }}>
        <span className="fl">Creemos que cada línea</span>
        {" "}
        <span className="fl">tiene una consecuencia:</span>
        {" "}
        <span className="fl">en la luz, en el uso,</span>
        {" "}
        <span className="fl">en la vida de quien la habita.</span>
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "32px 64px", marginTop: "56px" }}>
        <p className="rv" style={{ flex: "1 1 360px", margin: "0", maxWidth: "560px", fontSize: "21px", lineHeight: "1.5", color: "#C9C8C2" }}>Somos un estudio de arquitectura e ingeniería de Buenos Aires, fundado en 2012 por Lucía Ferrante y Tomás Albarracín. Trabajamos con pocos proyectos a la vez para que cada uno tenga a sus autores en la obra, no solo en el tablero.</p>
        <p className="rv" style={{ flex: "1 1 360px", margin: "0", maxWidth: "560px", fontSize: "17px", lineHeight: "1.6", color: "#A3A29C" }}>Antes de diseñar, escuchamos: cómo se mueve el sol en el terreno, qué rutinas tiene la familia, cuánto se puede invertir. El proyecto sale de esas respuestas, no de una fórmula.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px", marginTop: "clamp(64px, 8vw, 112px)" }}>
        <div className="stat" style={{ paddingTop: "20px" }}>
          <span className="disp" style={{ display: "block", fontSize: "clamp(67px, 8vw, 120px)", lineHeight: "1" }}>64</span>
          <span className="mono" style={{ display: "block", marginTop: "16px", fontSize: "11px", letterSpacing: "0.06em", color: "#A3A29C" }}>OBRAS CONSTRUIDAS</span>
        </div>
        <div className="stat" style={{ paddingTop: "20px" }}>
          <span className="disp" style={{ display: "block", fontSize: "clamp(67px, 8vw, 120px)", lineHeight: "1" }}>38.500</span>
          <span className="mono" style={{ display: "block", marginTop: "16px", fontSize: "11px", letterSpacing: "0.06em", color: "#A3A29C" }}>M² PROYECTADOS</span>
        </div>
        <div className="stat" style={{ paddingTop: "20px" }}>
          <span className="disp" style={{ display: "block", fontSize: "clamp(67px, 8vw, 120px)", lineHeight: "1" }}>14</span>
          <span className="mono" style={{ display: "block", marginTop: "16px", fontSize: "11px", letterSpacing: "0.06em", color: "#A3A29C" }}>AÑOS DE ESTUDIO</span>
        </div>
      </div>
    </section>
  );
}
