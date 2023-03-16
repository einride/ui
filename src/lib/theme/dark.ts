import { color } from "../../primitives/color"
import { ColorTheme } from "./types"

export const dark: ColorTheme = {
  /** @deprecated since v7.38.0. Use `(background | content).positive` instead. */
  positive: color.green[20],
  /** @deprecated since v7.38.0. Use `(background | content).negative` instead. */
  negative: color.red[40],
  /** @deprecated since v7.38.0. Use `(background | content).warning` instead. */
  warning: color.yellow[40],
  background: {
    primary: color.black,
    primaryElevated: color.grey[80],
    primaryElevatedInverted: color.white,
    primaryInverted: color.white,
    secondary: `${color.grey[10]}0D`, // 0D is HEX for ~5% opacity
    secondaryElevated: color.grey[90],
    secondaryElevatedInverted: color.grey[10],
    secondaryInverted: color.grey[10],
    tertiary: `${color.grey[10]}1A`, // 1A is HEX for ~10% opacity
    positive: color.green[20],
    warning: color.orange[40],
    negative: color.red[40],
    accent1: color.blue[40],
    accent2: color.violet[40],
    accent3: color.yellow[40],
    focus: `${color.black}B8`, // B8 is HEX for ~72% opacity
  },
  content: {
    primary: color.white,
    primaryInverted: color.black,
    secondary: `${color.grey[10]}B3`, // B3 is HEX for ~70% opacity
    tertiary: `${color.grey[10]}66`, // 66 is HEX for ~40% opacity
    positive: color.green[20],
    positiveInverted: color.green[60],
    warning: color.orange[40],
    negative: color.red[40],
  },
  border: {
    primary: color.grey[60],
    selected: color.white,
  },
  buttons: {
    background: {
      primary: color.white,
      secondary: color.grey[90],
      tertiary: color.black,
      hover: {
        primary: color.grey[10],
        secondary: color.grey[60],
        tertiary: color.grey[90],
      },
      active: {
        primary: color.white,
        secondary: color.grey[90],
        tertiary: color.black,
      },
      focused: {
        primary: color.grey[10],
        secondary: color.grey[90],
        tertiary: color.grey[90],
      },
      disabled: {
        primary: color.grey[90],
        secondary: color.grey[90],
        tertiary: color.black,
      },
    },
    text: {
      primary: color.black,
      secondary: color.white,
      tertiary: color.white,
      disabled: `${color.grey[10]}66`, // 66 is HEX for ~40% opacity
    },
    icon: {
      primary: color.green[60],
    },
  },
}
