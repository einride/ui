import { CommonTheme } from "./types"

const MEDIUM_BREAKPOINT_PIXELS = 600
const LARGE_BREAKPOINT_PIXELS = 1280

export const common: CommonTheme = {
  borderRadii: {
    none: "0",
    xs: "0.25rem",
    sm: "0.5rem",
    lg: "1rem",
    xl: "1.5rem",
    full: "9999px",
  },
  breakpoints: {
    md: MEDIUM_BREAKPOINT_PIXELS,
    lg: LARGE_BREAKPOINT_PIXELS,
  },
  mediaQueries: {
    belowMd: `(max-width: ${MEDIUM_BREAKPOINT_PIXELS - 1}px)`,
    onlyMd: `(min-width: ${MEDIUM_BREAKPOINT_PIXELS}px) and (max-width: ${
      LARGE_BREAKPOINT_PIXELS - 1
    }px)`,
    md: `(min-width: ${MEDIUM_BREAKPOINT_PIXELS}px)`,
    belowLg: `(max-width: ${LARGE_BREAKPOINT_PIXELS - 1}px)`,
    lg: `(min-width: ${LARGE_BREAKPOINT_PIXELS}px)`,
  },
  fonts: {
    heading:
      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
    body: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
  },
  fontSizes: {
    sm: "0.875rem",
    md: "1.125rem",
    lg: "1.5rem",
    xl: "1.75rem",
    "2xl": "2.5rem",
    "3xl": "5rem",
  },
  fontVariants: {
    numeric: "normal",
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    book: 450,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  /** @deprecated since 6.56.0. */
  grid: {
    gap: "var(--einride-ui-grid-gap)",
    columns: "var(--einride-ui-grid-columns)",
  },
  spacer: 8,
  spacingBase: 0.5,
  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "3rem",
    xl: "4rem",
  },
  transitions: {
    easeIn: {
      duration: "400ms",
      timingFunction: "cubic-bezier(0.21, 0.69, 0.20, 1.00)",
    },
    easeOut: {
      duration: "360ms",
      timingFunction: "cubic-bezier(0.84, 0.00, 0.33, 1.00)",
    },
    morph: {
      duration: "360ms",
      timingFunction: "cubic-bezier(0.84, 0.00, 0.94, 0.65)",
    },
  },
}
