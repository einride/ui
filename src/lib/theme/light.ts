import { color } from "../../primitives/color"
import { ColorTheme } from "./types"

export const light: ColorTheme = {
  /** @deprecated since v7.38.0. Use `(background | content).positive` instead. */
  positive: color.green[40],
  /** @deprecated since v7.38.0. Use `(background | content).negative` instead. */
  negative: color.red[60],
  /** @deprecated since v7.38.0. Use `(background | content).warning` instead. */
  warning: color.yellow[60],
  background: {
    primary: color.white,
    primaryElevated: color.white,
    primaryElevatedInverted: color.grey[80],
    primaryInverted: color.black,
    secondary: `${color.grey[90]}0C`, // 0C is HEX for ~4.7% opacity
    secondaryElevated: color.grey[10],
    secondaryElevatedInverted: color.black,
    secondaryInverted: color.grey[90],
    tertiary: `${color.grey[90]}17`, // 17 is HEX for ~9% opacity
    tertiaryElevated: color.grey[20],
    tertiaryElevatedInverted: color.grey[90],
    positive: color.green[60],
    warning: color.orange[60],
    negative: color.red[60],
    accent1: color.blue[60],
    accent2: color.violet[60],
    accent3: color.yellow[60],
    highlight: color.green[20],
    focus: `${color.black}66`, // 66 is HEX for ~40% opacity
  },
  content: {
    primary: color.grey[90],
    primaryInverted: color.white,
    secondary: `${color.grey[90]}99`, // 99 is HEX for ~60% opacity
    secondaryInverted: `${color.grey[10]}B3`, // B3 is HEX for ~70% opacity
    tertiary: `${color.grey[90]}66`, // 66 is HEX for ~40% opacity
    tertiaryInverted: `${color.grey[10]}66`, // 66 is HEX for ~40% opacity
    positive: color.green[60],
    positiveInverted: color.green[20],
    warning: color.orange[60],
    warningInverted: color.orange[40],
    negative: color.red[60],
    negativeInverted: color.red[40],
  },
  border: {
    primary: color.grey[30],
    primaryInverted: color.grey[60],
    selected: color.black,
    selectedInverted: color.white,
  },
  buttons: {
    background: {
      primary: color.black,
      secondary: color.grey[10],
      tertiary: color.white,
      hover: {
        primary: color.grey[90],
        secondary: color.grey[20],
        tertiary: color.grey[20],
      },
      active: {
        primary: color.black,
        secondary: color.grey[10],
        tertiary: color.white,
      },
      focused: {
        primary: color.grey[90],
        secondary: color.grey[20],
        tertiary: color.grey[20],
      },
      disabled: {
        primary: color.grey[10],
        secondary: color.grey[10],
        tertiary: color.white,
      },
    },
    text: {
      primary: color.white,
      secondary: color.grey[90],
      tertiary: color.grey[90],
      disabled: `${color.grey[90]}66`, // 66 is HEX for ~40% opacity
    },
    icon: {
      primary: color.green[20],
    },
  },
}
