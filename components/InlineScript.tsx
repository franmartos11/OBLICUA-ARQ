// Script en línea que corre durante el parseo del HTML, antes del primer pintado.
// En el cliente se marca text/plain para que React no lo vuelva a ejecutar ni avise.
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
