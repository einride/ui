export const backgroundColors = [
  "primary",
  "primaryElevated",
  "primaryElevatedInverted",
  "primaryInverted",
  "secondary",
  "secondaryElevated",
  "secondaryElevatedInverted",
  "secondaryInverted",
  "tertiary",
  "positive",
  "warning",
  "negative",
  "accent1",
  "accent2",
  "accent3",
  "focus",
] as const
export type BackgroundColor = (typeof backgroundColors)[number]

export type BorderColor = "primary" | "selected"

export const borderRadii = ["none", "xs", "sm", "lg", "xl", "full"] as const
export type BorderRadius = (typeof borderRadii)[number]

type Breakpoint = "md" | "lg"

interface ButtonBackground {
  primary: string
  secondary: string
  tertiary: string
  hover: Record<string, string>
  active: Record<string, string>
  focused: Record<string, string>
  disabled: Record<string, string>
}

interface ButtonText {
  primary: string
  secondary: string
  tertiary: string
  disabled: string
}

interface ButtonIcon {
  primary: string
}

export const contentColors = [
  "primary",
  "primaryInverted",
  "secondary",
  "tertiary",
  "positive",
  "warning",
  "negative",
] as const
export type ContentColor = (typeof contentColors)[number]

export const fonts = ["heading", "body", "mono"] as const
export type Font = (typeof fonts)[number]

export const fontSizes = ["sm", "md", "lg", "xl", "2xl", "3xl"] as const
export type FontSize = (typeof fontSizes)[number]

type FontVariant = { numeric: string }

const fontWeights = [
  "hairline",
  "thin",
  "light",
  "normal",
  "book",
  "medium",
  "semibold",
  "bold",
  "extrabold",
  "black",
] as const
export type FontWeight = (typeof fontWeights)[number]

type MediaQuery = "belowMd" | "onlyMd" | "md" | "belowLg" | "lg"

type Spacer = number

type SpacingBase = number

export const spacings = ["xs", "sm", "md", "lg", "xl"] as const
export type Spacing = (typeof spacings)[number]

type Transition = "easeIn" | "easeOut" | "morph"

type TransitionVariant = { duration: string; timingFunction: string }

export interface ColorTheme {
  background: Record<BackgroundColor, string>
  border: Record<BorderColor, string>
  buttons: {
    background: ButtonBackground
    text: ButtonText
    icon: ButtonIcon
  }
  content: Record<ContentColor, string>
  negative: string
  positive: string
  warning: string
}

export interface CommonTheme {
  borderRadii: Record<BorderRadius, string>
  breakpoints: Record<Breakpoint, number>
  mediaQueries: Record<MediaQuery, string>
  fonts: Record<Font, string>
  fontSizes: Record<FontSize, string>
  fontVariants: FontVariant
  fontWeights: Record<FontWeight, number>
  spacer: Spacer
  spacingBase: SpacingBase
  spacing: Record<Spacing, string>
  transitions: Record<Transition, TransitionVariant>
}

export interface Theme extends CommonTheme {
  colors: ColorTheme
}
