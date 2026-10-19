'use client';

import { useState, type FormEvent } from 'react';
import { ACCENT } from '@/lib/config';

export default function Contact() {
  const accent = ACCENT;
  const [sent, setSent] = useState(false);
  const notSent = !sent;
  // Igual que en el diseño: el formulario no se envía a ningún lado todavía, solo muestra la confirmación.
  const onSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <section id="contacto" style={{ borderTop: "1px solid #2A2A28" }}>
      <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "clamp(96px, 12vw, 176px) clamp(16px, 4vw, 48px)", boxSizing: "border-box", display: "flex", flexWrap: "wrap", gap: "56px 64px" }}>
        <div style={{ flex: "1 1 420px", minWidth: "0", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "40px" }}>
          <h2 className="disp" style={{ margin: "0", fontSize: "clamp(67px, 9vw, 150px)", lineHeight: "0.86" }}>
            <span className="mk">
              <span>¿Tenés un</span>
            </span>
            {" "}
            <span className="mk">
              <span>terreno?</span>
            </span>
            {" "}
            <span className="mk">
              <span style={{ color: accent }}>Dibujemos.</span>
            </span>
          </h2>
          <div>
            <p style={{ margin: "0 0 24px", maxWidth: "440px", fontSize: "19px", lineHeight: "1.5", color: "#C9C8C2" }}>Contanos qué querés construir y dónde. Te respondemos en 48 horas hábiles para coordinar una primera reunión.</p>
            <div className="mono" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", fontSize: "13px" }}>
              <a href="mailto:hola@oblicuaarq.com.ar" style={{ display: "inline-flex", alignItems: "center", minHeight: "44px" }}>hola@oblicuaarq.com.ar</a>
              <a href="tel:+541155550142" style={{ display: "inline-flex", alignItems: "center", minHeight: "44px" }}>+54 11 5555-0142</a>
              <span style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", color: "#A3A29C" }}>Humboldt 1550, of. 4 · Palermo, CABA</span>
            </div>
          </div>
        </div>
        <div style={{ flex: "1 1 440px", minWidth: "0" }}>
          {notSent && (
            <>
              <form onSubmit={onSend} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "28px" }}>
                  <label className="fld" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span className="mono" style={{ fontSize: "11px", letterSpacing: "0.06em", color: "#A3A29C" }}>NOMBRE</span>
                    <input type="text" name="nombre" autoComplete="name" required />
                  </label>
                  {" "}
                  <label className="fld" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span className="mono" style={{ fontSize: "11px", letterSpacing: "0.06em", color: "#A3A29C" }}>EMAIL</span>
                    <input type="email" name="email" autoComplete="email" required />
                  </label>
                </div>
                <label className="fld" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span className="mono" style={{ fontSize: "11px", letterSpacing: "0.06em", color: "#A3A29C" }}>UBICACIÓN DEL TERRENO U OBRA</span>
                  <input type="text" name="ubicacion" />
                </label>
                <fieldset style={{ border: "0", margin: "0", padding: "0", minWidth: "0" }}>
                  <legend className="mono" style={{ padding: "0", fontSize: "11px", letterSpacing: "0.06em", color: "#A3A29C" }}>TIPO DE PROYECTO</legend>
                  <div className="mono" style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "12px", fontSize: "11px", letterSpacing: "0.06em" }}>
                    <label className="chip">
                      <input type="radio" name="tipo" value="vivienda" />
                      VIVIENDA NUEVA
                    </label>
                    {" "}
                    <label className="chip">
                      <input type="radio" name="tipo" value="interior" />
                      INTERIORISMO
                    </label>
                    {" "}
                    <label className="chip">
                      <input type="radio" name="tipo" value="reciclaje" />
                      RECICLAJE
                    </label>
                    {" "}
                    <label className="chip">
                      <input type="radio" name="tipo" value="otro" />
                      OTRO
                    </label>
                  </div>
                </fieldset>
                <label className="fld" style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <span className="mono" style={{ fontSize: "11px", letterSpacing: "0.06em", color: "#A3A29C" }}>CONTANOS TU IDEA</span>
                  <textarea name="mensaje" rows={3} />
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px 24px" }}>
                  <button className="cta mono cta-full" type="submit" style={{ display: "inline-flex", alignItems: "center", gap: "16px", minHeight: "56px", padding: "0 28px", background: accent, color: "#0B0B0B", border: "0", fontSize: "12px", letterSpacing: "0.08em", cursor: "pointer" }}>
                    ENVIAR CONSULTA{" "}
                    <svg className="arr" aria-hidden="true" width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M0 6 H16 M11 1 L16 6 L11 11" />
                    </svg>
                  </button>
                  {" "}
                  <span style={{ fontSize: "13px", lineHeight: "1.5", color: "#8C8B86" }}>Usamos tus datos solo para responderte.</span>
                </div>
              </form>
            </>
          )}
          {" "}
          {sent && (
            <>
              <div className="sent" role="status" style={{ border: "1px solid #2A2A28", padding: "40px", display: "flex", flexDirection: "column", gap: "20px" }}>
                <svg aria-hidden="true" width="64" height="64" viewBox="0 0 64 64" fill="none" stroke={accent} strokeWidth="2">
                  <circle className="dr" pathLength="1" cx="32" cy="32" r="30" />
                  <path className="dr" pathLength="1" d="M18 33 L28 43 L46 23" />
                </svg>
                <p className="disp" style={{ margin: "0", fontSize: "44px", lineHeight: "0.95" }}>Recibimos tu consulta</p>
                <p style={{ margin: "0", fontSize: "17px", lineHeight: "1.55", color: "#A3A29C" }}>Te escribimos en 48 horas hábiles para coordinar la primera reunión. Si tenés planos, fotos o la escritura del terreno, tenelos a mano.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
