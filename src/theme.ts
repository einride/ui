import { color } from "./primitives/color";

export const light = {
  colors: {
    positive: color.green.default,
    accent: color.violet.defualt,
    negative: color.red.default,
    warning: color.yellow.default,
    text: {
      primary: color.greyscale.grey100,
      secondary: color.greyscale.grey80,
      disabled: color.greyscale.grey60,
    },
    background: {
      primary: color.white,
      secondary: color.greyscale.grey20,
      tertiary: color.greyscale.grey40,
      disabled: color.greyscale.grey20,
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

export type Theme = typeof light;
