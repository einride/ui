import { color } from "../../primitives/color"

const MEDIUM_BREAKPOINT_PIXELS = 600
const LARGE_BREAKPOINT_PIXELS = 1024

const common = {
  spacer: 8,
  breakpoint: {
    belowMedium: `@media (max-width: ${MEDIUM_BREAKPOINT_PIXELS - 1}px)`,
    medium: `@media (min-width: ${MEDIUM_BREAKPOINT_PIXELS}px)`,
    belowLarge: `@media (max-width: ${LARGE_BREAKPOINT_PIXELS - 1}px)`,
    large: `@media (min-width: ${LARGE_BREAKPOINT_PIXELS}px)`,
  },
  fonts: {
    heading:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.75rem",
    "4xl": "2rem",
    "5xl": "2.5rem",
    "6xl": "3rem",
    "7xl": "4rem",
    "8xl": "5rem",
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
  primitives: {
    color,
  },
}

export const light = {
  colors: {
    positive: color.green.default,
    accent: color.violet.default,
    negative: color.red.default,
    warning: color.yellow.default,
    background: {
      primary: color.white,
      secondary: color.greyscale.grey20,
      tertiary: color.greyscale.grey40,
      accent: `${color.violet.default}1A`, // 1A is HEX for 10 % opacity
      positive: `${color.green.default}1A`, // 1A is HEX for 10 % opacity
      negative: `${color.red.default}1A`, // 1A is HEX for 10 % opacity
    },
    content: {
      primary: color.greyscale.grey100,
      secondary: `${color.greyscale.grey100}99`, // 99 is HEX for 60 % opacity
      disabled: `${color.greyscale.grey100}66`, // 66 is HEX for 40 % opacity
      accent: color.violet.dark,
      positive: color.green.dark,
      negative: color.red.dark,
    },
    border: {
      primary: color.greyscale.grey50,
      selected: color.black,
    },
    buttons: {
      background: {
        primary: color.black,
        secondary: color.greyscale.grey20,
        tertiary: color.white,
        disabled: color.greyscale.grey20,
        hover: {
          primary: color.greyscale.grey100,
          secondary: color.greyscale.grey40,
          tertiary: color.greyscale.grey40,
        },
        active: {
          primary: color.black,
          secondary: color.greyscale.grey20,
          tertiary: color.white,
        },
      },
      text: {
        primary: color.white,
        secondary: color.greyscale.grey100,
        tertiary: color.greyscale.grey100,
        disabled: `${color.greyscale.grey100}66`, // 66 is HEX for 40 % opacity
      },
    },
  },
  ...common,
}

export const dark: Theme = {
  colors: {
    positive: color.green.light,
    accent: color.violet.light,
    negative: color.red.light,
    warning: color.yellow.light,
    background: {
      primary: color.black,
      secondary: color.greyscale.grey100,
      tertiary: color.greyscale.grey80,
      accent: `${color.violet.default}1A`, // 1A is HEX for 10 % opacity
      positive: `${color.green.default}1A`, // 1A is HEX for 10 % opacity
      negative: `${color.red.default}1A`, // 1A is HEX for 10 % opacity
    },
    content: {
      primary: color.white,
      secondary: `${color.greyscale.grey20}B3`, // B3 is HEX for 70 % opacity
      disabled: `${color.greyscale.grey20}66`, // 66 is HEX for 40 % opacity
      accent: color.violet.light,
      positive: color.green.light,
      negative: color.red.light,
    },
    border: {
      primary: color.greyscale.grey80,
      selected: color.white,
    },
    buttons: {
      background: {
        primary: color.black,
        secondary: color.greyscale.grey20,
        tertiary: color.white,
        disabled: color.greyscale.grey20,
        hover: {
          primary: color.greyscale.grey100,
          secondary: color.greyscale.grey40,
          tertiary: color.greyscale.grey40,
        },
        active: {
          primary: color.black,
          secondary: color.greyscale.grey20,
          tertiary: color.white,
        },
      },
      text: {
        primary: color.white,
        secondary: color.greyscale.grey100,
        tertiary: color.greyscale.grey100,
        disabled: `${color.greyscale.grey100}66`, // 66 is HEX for 40 % opacity
      },
    },
  },
  ...common,
}

export type Theme = typeof light
export const themes = { light, dark }
