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
    sm: "0.875rem",
    md: "1.125rem",
    lg: "1.5rem",
    xl: "1.75rem",
    "2xl": "2.5rem",
    "3xl": "5rem",
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
  grid: {
    gap: "var(--einride-ui-grid-gap)",
    columns: "var(--einride-ui-grid-columns)",
  },
  primitives: {
    color,
  },
}

export const light = {
  colors: {
    positive: color.green.default,
    negative: color.red.default,
    warning: color.yellow.default,
    background: {
      primary: color.greyscale.white,
      secondary: color.greyscale.grey20,
      tertiary: color.greyscale.grey40,
      positive: `${color.green.default}1A`, // 1A is HEX for 10 % opacity
      negative: `${color.red.default}1A`, // 1A is HEX for 10 % opacity
    },
    content: {
      primary: color.greyscale.grey100,
      secondary: `${color.greyscale.grey100}99`, // 99 is HEX for 60 % opacity
      tertiary: `${color.greyscale.grey100}66`, // 66 is HEX for 40 % opacity
      positive: color.green.dark,
      negative: color.red.dark,
    },
    border: {
      primary: color.greyscale.grey50,
      selected: color.greyscale.black,
    },
    buttons: {
      background: {
        primary: color.greyscale.black,
        secondary: color.greyscale.grey20,
        tertiary: color.greyscale.white,
        hover: {
          primary: color.greyscale.grey100,
          secondary: color.greyscale.grey40,
          tertiary: color.greyscale.grey40,
        },
        active: {
          primary: color.greyscale.black,
          secondary: color.greyscale.grey20,
          tertiary: color.greyscale.white,
        },
        focused: {
          primary: color.greyscale.grey100,
          secondary: color.greyscale.grey40,
          tertiary: color.greyscale.grey40,
        },
        disabled: color.greyscale.grey20,
      },
      text: {
        primary: color.greyscale.white,
        secondary: color.greyscale.grey100,
        tertiary: color.greyscale.grey100,
        disabled: `${color.greyscale.grey100}66`, // 66 is HEX for 40 % opacity
      },
      icon: {
        primary: color.green.light,
      },
    },
  },
  ...common,
}

export const dark: Theme = {
  colors: {
    positive: color.green.light,
    negative: color.red.light,
    warning: color.yellow.light,
    background: {
      primary: color.greyscale.black,
      secondary: color.greyscale.grey100,
      tertiary: color.greyscale.grey80,
      positive: `${color.green.default}1A`, // 1A is HEX for 10 % opacity
      negative: `${color.red.default}1A`, // 1A is HEX for 10 % opacity
    },
    content: {
      primary: color.greyscale.white,
      secondary: `${color.greyscale.grey20}B3`, // B3 is HEX for 70 % opacity
      tertiary: `${color.greyscale.grey20}66`, // 66 is HEX for 40 % opacity
      positive: color.green.light,
      negative: color.red.light,
    },
    border: {
      primary: color.greyscale.grey80,
      selected: color.greyscale.white,
    },
    buttons: {
      background: {
        primary: color.greyscale.grey20,
        secondary: color.greyscale.black,
        tertiary: color.greyscale.grey100,
        hover: {
          primary: color.greyscale.white,
          secondary: color.greyscale.grey100,
          tertiary: color.greyscale.grey100,
        },
        active: {
          primary: color.greyscale.grey20,
          secondary: color.greyscale.black,
          tertiary: color.greyscale.grey100,
        },
        focused: {
          primary: color.greyscale.white,
          secondary: color.greyscale.grey100,
          tertiary: color.greyscale.grey100,
        },
        disabled: color.greyscale.black,
      },
      text: {
        primary: color.greyscale.black,
        secondary: color.greyscale.white,
        tertiary: color.greyscale.white,
        disabled: `${color.greyscale.grey20}66`, // 66 is HEX for 40 % opacity
      },
      icon: {
        primary: color.green.dark,
      },
    },
  },
  ...common,
}

export type Theme = typeof light
export const themes = { light, dark }
