import 'react'

// Allow CSS custom properties such as --c in inline styles.
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined
  }
}
