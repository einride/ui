import { CSSProperties, ElementType } from "react"
import {
  BackgroundColor,
  BorderRadius as BorderRadiusType,
  ContentColor,
  Font,
  FontSize as FontSizeType,
  FontWeight as FontWeightType,
  Spacing,
} from "./types"

export type SpacingInput = Spacing | Omit<string, Spacing> | number

export type AlignItems = CSSProperties["alignItems"]
export type As = ElementType
export type Background = BackgroundColor | Omit<string, BackgroundColor>
export type BlockSize = SpacingInput
export type BorderRadius = BorderRadiusType | Omit<string, BorderRadiusType> | number
export type Color = ContentColor | Omit<string, ContentColor>
export type Display = CSSProperties["display"]
export type FlexDirection = CSSProperties["flexDirection"]
export type FlexGrow = CSSProperties["flexGrow"]
export type FlexShrink = CSSProperties["flexShrink"]
export type FlexWrap = CSSProperties["flexWrap"]
export type FontFamily = Font | Omit<string, Font>
export type FontSize = FontSizeType | Omit<string, FontSizeType> | number
export type FontWeight = FontWeightType | number
export type Gap = Spacing | "none" | Omit<string, Spacing | "none"> | number
export type Height = SpacingInput
export type InlineSize = SpacingInput
export type InsetBlockEnd = SpacingInput
export type InsetBlockStart = SpacingInput
export type InsetInlineEnd = SpacingInput
export type InsetInlineStart = SpacingInput
export type JustifyContent = CSSProperties["justifyContent"]
export type Margin = SpacingInput
export type MarginBottom = SpacingInput
export type MarginBlockEnd = SpacingInput
export type MarginBlockStart = SpacingInput
export type MarginInlineEnd = SpacingInput
export type MarginInlineStart = SpacingInput
export type MarginLeft = SpacingInput
export type MarginRight = SpacingInput
export type MarginTop = SpacingInput
export type MaxBlockSize = SpacingInput
export type MaxInlineSize = SpacingInput
export type MaxWidth = SpacingInput
export type Padding = SpacingInput
export type PaddingBottom = SpacingInput
export type PaddingBlock = SpacingInput
export type PaddingBlockEnd = SpacingInput
export type PaddingInline = SpacingInput
export type PaddingLeft = SpacingInput
export type PaddingRight = SpacingInput
export type PaddingTop = SpacingInput
export type PointerEvents = CSSProperties["pointerEvents"]
export type Position = CSSProperties["position"]
export type TextAlign = CSSProperties["textAlign"]
export type Width = SpacingInput
