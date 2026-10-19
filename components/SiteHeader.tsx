'use client';

import { useEffect, useState, type KeyboardEvent } from 'react';
import { ACCENT } from '@/lib/config';

export default function SiteHeader() {
  const accent = ACCENT;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuExp = menuOpen ? 'true' : 'false';
  const toggleMenu = () => setMenuOpen((o) => !o);
  const closeMenu = () => setMenuOpen(false);
  const onMenuKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') setMenuOpen(false);
  };

  // Al abrir el menú, el foco va al botón CERRAR (así Escape funciona sin hacer clic antes);
  // al cerrarlo, vuelve al botón MENÚ.
  useEffect(() => {
    if (menuOpen) {
      document.querySelector<HTMLButtonElement>('#menu button')?.focus();
      return () => document.querySelector<HTMLButtonElement>('.burger')?.focus();
    }
  }, [menuOpen]);

  return (
    <>
    <header className="nav" style={{ maxWidth: "1440px", margin: "0 auto", padding: "24px clamp(16px, 4vw, 48px)", boxSizing: "border-box", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px 32px" }}>
      <a className="disp brand" href="#top" style={{ fontSize: "28px", letterSpacing: "0.01em" }}>
        OBLICUA
        <span style={{ color: accent }}>/</span>
        ARQ
      </a>
      <nav className="mono nav-d" aria-label="Principal" style={{ display: "flex", gap: "24px", flexWrap: "wrap", fontSize: "12px", letterSpacing: "0.06em" }}>
        <a href="#estudio">ESTUDIO</a>
        {" "}
        <a href="#servicios">SERVICIOS</a>
        {" "}
        <a href="#proyectos">PROYECTOS</a>
        {" "}
        <a href="#metodo">MÉTODO</a>
        {" "}
        <a href="#preguntas">PREGUNTAS</a>
        {" "}
        <a href="#contacto" style={{ color: accent }}>CONTACTO</a>
      </nav>
      <button className="burger mono" type="button" aria-expanded={menuExp} aria-controls="menu" onClick={toggleMenu} style={{ alignItems: "center", gap: "12px", minHeight: "44px", padding: "0 14px", background: "transparent", color: "#F2F1EC", border: "1px solid #2A2A28", fontSize: "12px", letterSpacing: "0.06em", cursor: "pointer" }}>
        MENÚ{" "}
        <svg aria-hidden="true" width="18" height="10" viewBox="0 0 18 10" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M0 1 H18 M0 9 H18" />
        </svg>
      </button>
    </header>
    {menuOpen && (
      <>
        <div id="menu" className="menu" role="dialog" aria-modal="true" aria-label="Menú" onKeyDown={onMenuKey} style={{ position: "fixed", inset: "0", zIndex: "200", background: "#0B0B0B", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "32px", padding: "24px 16px calc(24px + env(safe-area-inset-bottom))", boxSizing: "border-box", overflowY: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="disp" style={{ fontSize: "28px", letterSpacing: "0.01em" }}>
              OBLICUA
              <span style={{ color: accent }}>/</span>
              ARQ
            </span>
            {" "}
            <button className="mono" type="button" onClick={toggleMenu} style={{ display: "inline-flex", alignItems: "center", gap: "12px", minHeight: "44px", padding: "0 14px", background: "transparent", color: "#F2F1EC", border: "1px solid #2A2A28", fontSize: "12px", letterSpacing: "0.06em", cursor: "pointer" }}>
              CERRAR{" "}
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 1 L13 13 M13 1 L1 13" />
              </svg>
            </button>
          </div>
          <nav aria-label="Menú principal" style={{ display: "flex", flexDirection: "column", borderTop: "1px solid #2A2A28" }}>
            <a className="disp" href="#estudio" onClick={closeMenu} style={{ display: "flex", alignItems: "baseline", gap: "16px", padding: "12px 0", borderBottom: "1px solid #2A2A28", fontSize: "50px", lineHeight: "0.95", textDecoration: "none" }}>
              <span className="mono" style={{ fontSize: "11px", fontWeight: "400", color: "#8C8B86" }}>01</span>
              Estudio
            </a>
            {" "}
            <a className="disp" href="#servicios" onClick={closeMenu} style={{ display: "flex", alignItems: "baseline", gap: "16px", padding: "12px 0", borderBottom: "1px solid #2A2A28", fontSize: "50px", lineHeight: "0.95", textDecoration: "none" }}>
              <span className="mono" style={{ fontSize: "11px", fontWeight: "400", color: "#8C8B86" }}>02</span>
              Servicios
            </a>
            {" "}
            <a className="disp" href="#proyectos" onClick={closeMenu} style={{ display: "flex", alignItems: "baseline", gap: "16px", padding: "12px 0", borderBottom: "1px solid #2A2A28", fontSize: "50px", lineHeight: "0.95", textDecoration: "none" }}>
              <span className="mono" style={{ fontSize: "11px", fontWeight: "400", color: "#8C8B86" }}>03</span>
              Proyectos
            </a>
            {" "}
            <a className="disp" href="#metodo" onClick={closeMenu} style={{ display: "flex", alignItems: "baseline", gap: "16px", padding: "12px 0", borderBottom: "1px solid #2A2A28", fontSize: "50px", lineHeight: "0.95", textDecoration: "none" }}>
              <span className="mono" style={{ fontSize: "11px", fontWeight: "400", color: "#8C8B86" }}>04</span>
              Método
            </a>
            {" "}
            <a className="disp" href="#preguntas" onClick={closeMenu} style={{ display: "flex", alignItems: "baseline", gap: "16px", padding: "12px 0", borderBottom: "1px solid #2A2A28", fontSize: "50px", lineHeight: "0.95", textDecoration: "none" }}>
              <span className="mono" style={{ fontSize: "11px", fontWeight: "400", color: "#8C8B86" }}>05</span>
              Preguntas
            </a>
            {" "}
            <a className="disp" href="#contacto" onClick={closeMenu} style={{ display: "flex", alignItems: "baseline", gap: "16px", padding: "12px 0", borderBottom: "1px solid #2A2A28", fontSize: "50px", lineHeight: "0.95", textDecoration: "none" }}>
              <span className="mono" style={{ fontSize: "11px", fontWeight: "400", color: "#8C8B86" }}>06</span>
              <span style={{ color: accent }}>Contacto</span>
            </a>
          </nav>
          <div className="mono" style={{ fontSize: "12px", lineHeight: "1.8", color: "#A3A29C" }}>
            hola@oblicuaarq.com.ar
            <br />
            +54 11 5555-0142
            <br />
            Humboldt 1550, of. 4 · Palermo, CABA
          </div>
        </div>
      </>
    )}
    </>
  );
}
