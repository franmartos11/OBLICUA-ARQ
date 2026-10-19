import { FAQS } from '@/lib/data';

export default function Faq() {
  const faqs = FAQS;

  return (
    <section id="preguntas" style={{ borderTop: "1px solid #2A2A28" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(80px, 11vw, 160px) clamp(16px, 4vw, 48px)", boxSizing: "border-box" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "24px", marginBottom: "48px" }}>
          <h2 className="disp mk" style={{ margin: "0", fontSize: "clamp(50px, 8vw, 120px)", lineHeight: "0.88" }}>
            <span>Preguntas</span>
          </h2>
          <p className="rv" style={{ margin: "0", maxWidth: "420px", fontSize: "17px", lineHeight: "1.55", color: "#A3A29C" }}>Lo que más nos consultan antes de empezar. Si tu duda no está, escribinos.</p>
        </div>
        <div style={{ maxWidth: "980px", marginLeft: "auto", borderBottom: "1px solid #2A2A28" }}>
          {faqs.map((f, f_i) => (
              <details key={f_i} className="faq" style={{ borderTop: "1px solid #2A2A28" }}>
                <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", padding: "24px 0", minHeight: "44px" }}>
                  <span className="disp" style={{ fontSize: "clamp(24px, 2.4vw, 34px)", lineHeight: "1.05" }}>{f.q}</span>
                  {" "}
                  <svg className="plus" aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ flex: "none" }}>
                    <path d="M10 0 V20 M0 10 H20" />
                  </svg>
                </summary>
                <p style={{ margin: "0", padding: "0 48px 28px 0", maxWidth: "680px", fontSize: "17px", lineHeight: "1.6", color: "#A3A29C" }}>{f.a}</p>
              </details>
          ))}
        </div>
      </div>
    </section>
  );
}
