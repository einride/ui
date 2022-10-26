export type BackgroundColor =
  | "primary"
  | "primaryElevated"
  | "primaryElevatedInverted"
  | "primaryInverted"
  | "secondary"
  | "secondaryElevated"
  | "secondaryElevatedInverted"
  | "secondaryInverted"
  | "tertiary"
  | "positive"
  | "negative"
  | "focus"
  | "reverse"

export type BorderColor = "primary" | "selected"

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

export type ContentColor =
  | "primary"
  | "primaryInverted"
  | "secondary"
  | "tertiary"
  | "positive"
  | "negative"
  | "reverse"

export type Font = "heading" | "body" | "mono"

type FontSize = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"

type FontVariant = { numeric: string }

type FontWeight =
  | "hairline"
  | "thin"
  | "light"
  | "normal"
  | "book"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black"

type MediaQuery = "belowMd" | "onlyMd" | "md" | "belowLg" | "lg"

export type Radius = "none" | "xs" | "sm" | "lg" | "xl" | "full"

type Spacer = number

type SpacingBase = number

export const spacings = ["xs", "sm", "md", "lg", "xl"] as const
export type Spacing = typeof spacings[number]

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
  borderRadii: Record<Radius, string>
  breakpoints: Record<Breakpoint, number>
  mediaQueries: Record<MediaQuery, string>
  fonts: Record<Font, string>
  fontSizes: Record<FontSize, string>
  fontVariants: FontVariant
  fontWeights: Record<FontWeight, number>
  grid: Record<string, string>
  spacer: Spacer
  spacingBase: SpacingBase
  spacing: Record<Spacing, string>
  transitions: Record<Transition, TransitionVariant>
}

export interface Theme extends CommonTheme {
  colors: ColorTheme
}
