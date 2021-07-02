import { color } from "./primitives/color";

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
      disabled: color.greyscale.grey20,
      accent: `${color.violet.default}1A`, // 1A is HEX for 10 % opacity
      positive: `${color.green.default}1A`, // 1A is HEX for 10 % opacity
      negative: `${color.red.default}1A`, // 1A is HEX for 10 % opacity
    },
    content: {
      primary: color.greyscale.grey100,
      secondary: color.greyscale.grey80,
      disabled: color.greyscale.grey60,
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
        tertiary: color.greyscale.grey100,
        disabled: color.greyscale.grey60,
      },
    },
  },
};

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
      disabled: "", // TBA
      accent: "", // TBA
      positive: "", // TBA
      negative: "", // TBA
    },
    content: {
      primary: color.white,
      secondary: color.greyscale.grey60,
      disabled: color.greyscale.grey80,
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
        tertiary: color.greyscale.grey100,
        disabled: color.greyscale.grey60,
      },
    },
  },
};

export type Theme = typeof light;
