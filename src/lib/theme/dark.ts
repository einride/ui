import { color } from "../../primitives/color"
import { ColorTheme } from "./types"

export const dark: ColorTheme = {
  positive: color.green.light,
  negative: color.red.light,
  warning: color.yellow.light,
  background: {
    primary: color.greyscale.black,
    primaryElevated: color.greyscale.grey90,
    primaryElevatedInverted: color.greyscale.white,
    primaryInverted: color.greyscale.white,
    secondary: color.greyscale.grey100,
    secondaryElevated: color.greyscale.black,
    secondaryElevatedInverted: color.greyscale.grey20,
    secondaryInverted: color.greyscale.grey20,
    tertiary: color.greyscale.grey80,
    positive: `${color.green.default}1A`, // 1A is HEX for 10 % opacity
    negative: `${color.red.default}1A`, // 1A is HEX for 10 % opacity
    focus: `${color.greyscale.black}66`, // 66 is HEX for 40 % opacity
    /** @deprecated since version 6.9.0. Use `primaryInverted` instead.  */
    reverse: color.greyscale.white,
  },
  content: {
    primary: color.greyscale.white,
    primaryInverted: color.greyscale.grey100,
    secondary: `${color.greyscale.grey20}B3`, // B3 is HEX for 70 % opacity
    tertiary: `${color.greyscale.grey20}66`, // 66 is HEX for 40 % opacity
    positive: color.green.light,
    negative: color.red.light,
    /** @deprecated since version 6.9.0. Use `primaryInverted` instead.  */
    reverse: color.greyscale.grey100,
  },
  border: {
    primary: color.greyscale.grey80,
    selected: color.greyscale.white,
  },
  buttons: {
    background: {
      primary: color.greyscale.white,
      secondary: color.greyscale.grey100,
      tertiary: color.greyscale.black,
      hover: {
        primary: color.greyscale.grey20,
        secondary: color.greyscale.grey80,
        tertiary: color.greyscale.grey100,
      },
      active: {
        primary: color.greyscale.white,
        secondary: color.greyscale.grey100,
        tertiary: color.greyscale.black,
      },
      focused: {
        primary: color.greyscale.grey20,
        secondary: color.greyscale.grey100,
        tertiary: color.greyscale.grey100,
      },
      disabled: {
        primary: color.greyscale.grey100,
        secondary: color.greyscale.grey100,
        tertiary: color.greyscale.black,
      },
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
}
