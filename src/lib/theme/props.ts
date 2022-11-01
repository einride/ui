import { CSSProperties, ElementType } from "react"
import {
  BackgroundColor,
  BorderRadius as BorderRadiusType,
  ContentColor,
  Font,
  FontWeight as FontWeightType,
  Spacing,
} from "./types"

export type AlignItems = CSSProperties["alignItems"]
export type As = ElementType
export type Background = BackgroundColor | Omit<string, BackgroundColor>
export type BorderRadius = BorderRadiusType | Omit<string, BorderRadiusType> | number
export type Color = ContentColor | Omit<string, ContentColor>
export type FlexWrap = CSSProperties["flexWrap"]
export type FontFamily = Font | Omit<string, Font>
export type FontWeight = FontWeightType | number
export type Gap = Spacing | "none" | Omit<string, Spacing | "none"> | number
export type Height = Spacing | Omit<string, Spacing> | number
export type JustifyContent = CSSProperties["justifyContent"]
export type PaddingBlockEnd = Spacing | Omit<string, Spacing> | number
export type TextAlign = CSSProperties["textAlign"]
export type Width = Spacing | Omit<string, Spacing> | number
