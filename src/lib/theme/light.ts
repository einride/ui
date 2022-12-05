import { color } from "../../primitives/color"
import { ColorTheme } from "./types"

export const light: ColorTheme = {
  positive: color.green[40],
  negative: color.red[60],
  warning: color.yellow[60],
  background: {
    primary: color.white,
    primaryElevated: color.white,
    primaryElevatedInverted: color.grey[80],
    primaryInverted: color.black,
    secondary: `${color.grey[80]}0C`, // 0C is HEX for ~4.7% opacity
    secondaryElevated: color.grey[20],
    secondaryElevatedInverted: color.black,
    secondaryInverted: color.grey[80],
    tertiary: `${color.grey[80]}17`, // 17 is HEX for ~9% opacity
    positive: `${color.green[40]}1A`, // 1A is HEX for ~10% opacity
    negative: `${color.red[60]}1A`, // 1A is HEX for ~10% opacity
    focus: `${color.black}66`, // 66 is HEX for ~40% opacity
    /** @deprecated since version 6.9.0. Use `primaryInverted` instead.  */
    reverse: color.black,
  },
  content: {
    primary: color.grey[80],
    primaryInverted: color.white,
    secondary: `${color.grey[80]}99`, // 99 is HEX for ~60% opacity
    tertiary: `${color.grey[80]}66`, // 66 is HEX for ~40% opacity
    positive: color.green[60],
    negative: color.red[80],
    /** @deprecated since version 6.9.0. Use `primaryInverted` instead.  */
    reverse: color.white,
  },
  border: {
    primary: color.grey[30],
    selected: color.black,
  },
  buttons: {
    background: {
      primary: color.black,
      secondary: color.grey[20],
      tertiary: color.white,
      hover: {
        primary: color.grey[80],
        secondary: color.grey[30],
        tertiary: color.grey[30],
      },
      active: {
        primary: color.black,
        secondary: color.grey[20],
        tertiary: color.white,
      },
      focused: {
        primary: color.grey[80],
        secondary: color.grey[30],
        tertiary: color.grey[30],
      },
      disabled: {
        primary: color.grey[20],
        secondary: color.grey[20],
        tertiary: color.white,
      },
    },
    text: {
      primary: color.white,
      secondary: color.grey[80],
      tertiary: color.grey[80],
      disabled: `${color.grey[80]}66`, // 66 is HEX for ~40% opacity
    },
    icon: {
      primary: color.green[20],
    },
  },
}
