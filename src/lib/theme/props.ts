import { CSSProperties, ElementType } from "react"
import {
  BackgroundColor,
  BorderRadius as BorderRadiusType,
  ContentColor,
  Font,
  FontWeight as FontWeightType,
  Spacing,
} from "./types"

export type SpacingInput = Spacing | Omit<string, Spacing> | number

export type AlignItems = CSSProperties["alignItems"]
export type As = ElementType
export type Background = BackgroundColor | Omit<string, BackgroundColor>
export type BorderRadius = BorderRadiusType | Omit<string, BorderRadiusType> | number
export type Color = ContentColor | Omit<string, ContentColor>
export type Display = CSSProperties["display"]
export type FlexDirection = CSSProperties["flexDirection"]
export type FlexGrow = CSSProperties["flexGrow"]
export type FlexWrap = CSSProperties["flexWrap"]
export type FontFamily = Font | Omit<string, Font>
export type FontWeight = FontWeightType | number
export type Gap = Spacing | "none" | Omit<string, Spacing | "none"> | number
export type Height = SpacingInput
export type JustifyContent = CSSProperties["justifyContent"]
export type Margin = SpacingInput
export type MarginBottom = SpacingInput
export type MarginLeft = SpacingInput
export type MarginRight = SpacingInput
export type MarginTop = SpacingInput
export type Padding = SpacingInput
export type PaddingBottom = SpacingInput
export type PaddingBlockEnd = SpacingInput
export type PaddingLeft = SpacingInput
export type PaddingRight = SpacingInput
export type PaddingTop = SpacingInput
export type TextAlign = CSSProperties["textAlign"]
export type Width = SpacingInput
