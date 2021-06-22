import { color } from "./primitives/color";

export const theme = {
  breakpoints: ["600px", "1024px"],
  colors: {
    positive: color.green.default,
    accent: color.violet.defualt,
    negative: color.red.default,
    warning: color.yellow.default,
    text: {
      primary: color.black,
      secondary: color.greyscale.grey80,
      disabled: color.greyscale.grey80,
    },
    background: {
      primary: color.white,
      secondary: color.greyscale.grey20,
      tertiary: color.greyscale.grey40,
    },
    border: {
      primary: color.greyscale.grey50,
      selected: color.black,
    },
    buttons: {
      background: {
        primary: color.black,
        secondary: color.greyscale.grey40,
        tertiary: color.white,
        disabled: color.greyscale.grey20,
        hover: {
          primary: color.greyscale.grey100,
          secondary: color.greyscale.grey20,
          tertiary: color.greyscale.grey20,
        },
        active: {
          primary: color.black,
          secondary: color.greyscale.grey40,
          tertiary: color.white,
        },
      },
      text: {
        primary: color.white,
        secondary: color.greyscale.grey100,
        disabled: color.greyscale.grey60,
      },
    },
    modes: {
      dark: {
        positive: "#000",
      },
    },
  },
  fontSizes: [14, 18, 28, 40, 80],
  lineHeights: {
    body: "24px",
  },
  buttons: {
    primary: {
      color: "#ffffff",
      backgroundColor: "#121212",
      ":hover": {
        backgroundColor: "#222222",
      },
      ":active": {
        backgroundColor: "#121212",
      },
    },
    secondary: {
      color: "#000000",
      backgroundColor: "#EBEBEB",
      ":hover": {
        backgroundColor: "#F5F5F5",
      },
      ":active": {
        backgroundColor: "#EBEBEB",
      },
    },
    tertiary: {
      color: "text.primary",
      backgroundColor: "background.primary",
      ":hover": {
        backgroundColor: "background.secondary",
      },
      ":active": {
        backgroundColor: "background.primary",
      },
    },
  },
};

export type Theme = typeof theme;
