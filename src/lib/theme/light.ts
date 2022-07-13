import { color } from "../../primitives/color"
import { ColorTheme } from "./types"

export const light: ColorTheme = {
  positive: color.green.default,
  negative: color.red.default,
  warning: color.yellow.default,
  background: {
    primary: color.greyscale.white,
    primaryElevated: color.greyscale.white,
    secondary: color.greyscale.grey20,
    secondaryElevated: color.greyscale.grey20,
    tertiary: color.greyscale.grey40,
    positive: `${color.green.default}1A`, // 1A is HEX for 10 % opacity
    negative: `${color.red.default}1A`, // 1A is HEX for 10 % opacity
    focus: `${color.greyscale.black}66`, // 66 is HEX for 40 % opacity
    reverse: color.greyscale.black,
  },
  content: {
    primary: color.greyscale.grey100,
    secondary: `${color.greyscale.grey100}99`, // 99 is HEX for 60 % opacity
    tertiary: `${color.greyscale.grey100}66`, // 66 is HEX for 40 % opacity
    positive: color.green.dark,
    negative: color.red.dark,
    reverse: color.greyscale.white,
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
      disabled: {
        primary: color.greyscale.grey20,
        secondary: color.greyscale.grey20,
        tertiary: color.greyscale.white,
      },
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
}
