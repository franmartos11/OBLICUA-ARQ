import 'react';

// Permite custom properties (--d, --acc, …) en los objetos style, como en el diseño original.
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
