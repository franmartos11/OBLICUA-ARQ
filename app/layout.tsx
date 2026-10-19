import type { Metadata, Viewport } from 'next';
import { preload } from 'react-dom';
import { InlineScript } from '@/components/InlineScript';
import './globals.css';

export const metadata: Metadata = {
  title: 'Oblicua — Arquitectura e ingeniería',
  description:
    'Estudio de arquitectura e ingeniería en Buenos Aires. Proyectamos y calculamos viviendas, interiores y edificios, del primer croquis a la entrega de llaves.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0B0B0B',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  preload('/fonts/big-shoulders-800-latin.woff', { as: 'font', type: 'font/woff', crossOrigin: 'anonymous' });
  preload('/fonts/martian-mono-400-87-latin.woff', { as: 'font', type: 'font/woff', crossOrigin: 'anonymous' });
  preload('/fonts/schibsted-grotesk-latin.woff2', { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' });

  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <InlineScript html="document.documentElement.classList.add('js')" />
        {children}
      </body>
    </html>
  );
}
