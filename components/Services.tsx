import { SERVICES } from '@/lib/data';

export default function Services() {
  const services = SERVICES;

  return (
    <section id="servicios" style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(80px, 11vw, 160px) clamp(16px, 4vw, 48px)", boxSizing: "border-box" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "48px" }}>
        <h2 className="disp mk" style={{ margin: "0", fontSize: "clamp(50px, 8vw, 120px)", lineHeight: "0.88" }}>
          <span>Servicios</span>
        </h2>
        <p className="rv" style={{ margin: "0", maxWidth: "420px", fontSize: "17px", lineHeight: "1.55", color: "#A3A29C" }}>Podés contratarnos para una etapa o para todo el proceso. En cada caso sabés de antemano qué vas a recibir.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1px", background: "#2A2A28", border: "1px solid #2A2A28" }}>
        {services.map((s, s_i) => (
            <div key={s_i} className="svc" style={{ background: "#0B0B0B", padding: "32px", minHeight: "clamp(300px, 30vw, 440px)", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "32px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <span className="mono" style={{ fontSize: "12px", letterSpacing: "0.06em" }}>{s.n}</span>
                {" "}
                <svg className="plus" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 0 V24 M0 12 H24" />
                </svg>
              </div>
              <div>
                <h3 className="disp" style={{ margin: "0 0 14px", fontSize: "38px", lineHeight: "0.95" }}>{s.title}</h3>
                <p className="muted" style={{ margin: "0 0 20px", fontSize: "16px", lineHeight: "1.55", color: "#A3A29C" }}>{s.text}</p>
                <ul className="mono" style={{ listStyle: "none", margin: "0", padding: "0", fontSize: "11px", letterSpacing: "0.04em", lineHeight: "1.9", borderTop: "1px solid currentColor", paddingTop: "12px" }}>
                  {s.items.map((it, it_i) => (
                      <li key={it_i}>— {it}</li>
                  ))}
                </ul>
              </div>
            </div>
        ))}
      </div>
    </section>
  );
}
