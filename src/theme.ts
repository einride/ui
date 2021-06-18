import { color } from "./primitives/color";

export const theme = {
  colors: {
    positive: color.green.default,
    accent: color.violet.defualt,
    negative: color.red.default,
    warning: color.yellow.default,
    text: {
      primary: color.greyscale.black,
      secondary: color.greyscale.grey80,
      disabled: color.greyscale.grey80,
    },
    background: {
      primary: color.greyscale.white,
      secondary: color.greyscale.grey20,
      tertiary: color.greyscale.grey40,
    },
    border: {
      primary: color.greyscale.grey50,
      selected: color.greyscale.black,
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
