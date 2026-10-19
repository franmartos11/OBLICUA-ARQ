# Oblicua — Arquitectura e ingeniería

Port a Next.js 16 (App Router, TypeScript) de la home diseñada como artifact en claude.ai.
El objetivo fue fidelidad total: mismo marcado, mismo CSS, mismas fuentes, mismas animaciones, desktop y mobile.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Estructura

| Ruta | Qué es |
| --- | --- |
| `app/page.tsx` | Arma la página con las secciones. Server Component. |
| `app/globals.css` | El CSS del diseño original sin cambios + `@font-face` locales + un agregado para evitar el flash del plano. |
| `components/` | Una sección por archivo. Son de cliente solo `SiteHeader`, `Hero`, `Projects`, `Method` y `Contact`. |
| `lib/tracer.ts` | Motor de trazado de los planos (planta y corte), portado 1:1 del original. |
| `lib/data.ts`, `lib/art.ts` | Textos, servicios, proyectos, pasos, preguntas y trazos de las axonometrías. |
| `lib/config.ts` | Color de acento (`#E5361E`; el diseño ofrecía también `#F2F1EC`, `#3D7BFF`, `#D9B44A`). |
| `public/fonts/` | Los mismos archivos de fuente que embebía el original (subconjunto latin). |
| `design/original.html` | El HTML exportado del artifact, como referencia. Se le agregó solo el `<meta name="viewport">`. |

## Cómo se verificó

Con `prefers-reduced-motion: reduce` (todo queda estático y la comparación es determinista), se capturó la página
completa del original y del port y se compararon píxel a píxel con `scripts/visual-diff.mjs`:

| Ancho | Diferencia |
| --- | --- |
| 1440 px (desktop) | 0 píxeles |
| 768 px (tablet) | 0 píxeles |
| 390 px (iPhone) | 0 píxeles |
| 360 px (Android) | 0 píxeles |

```bash
node scripts/visual-diff.mjs original.png port.png diff.png
```

Con animaciones activas se verificaron en mobile y desktop: trazado de la planta (se dibuja al bajar, cuando la planta
queda al menos 60 % a la vista; se rebobina al salir y se vuelve a dibujar en cada pasada; pluma, scrubber,
reproducir/pausar/volver a ver, salto por capa), corte del método con el mismo comportamiento al hacer scroll, menú mobile (Escape, foco),
indicador de sección por scroll, hover de proyectos, mira con coordenadas, preguntas y formulario. Sin errores en consola.

## Cambios respecto del diseño original

- **Dibujos completos en mobile.** En el original, la planta (760 px) y el corte (600 px) desbordaban en el teléfono y
  había que deslizarlos de costado. Ahora se ajustan al ancho y se ven enteros; se quitó el aviso "DESLIZÁ PARA
  RECORRER LA PLANTA". Escritorio y tablet no cambian (siguen dando 0 píxeles de diferencia contra el original).
- **Trazados al bajar.** La planta y el corte se dibujan cuando quedan a la vista al scrollear y se repiten en cada pasada.

## Pendiente

- El formulario de contacto, igual que en el diseño, no envía datos: solo muestra la confirmación. Falta conectarlo
  (Server Action, mail o CRM).
- Las fuentes cubren el subconjunto latin (todo el texto en español). Si se agrega texto con otros alfabetos, sumar los subconjuntos.
