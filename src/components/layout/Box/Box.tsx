import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import {
  getBackground,
  getBorderRadius,
  getColor,
  getSpacing,
} from "../../../lib/theme/prop-system"
import {
  AlignItems,
  As,
  Background,
  BlockSize,
  BorderRadius,
  Color,
  Display,
  FlexDirection,
  FlexGrow,
  FlexWrap,
  Gap,
  Height,
  InlineSize,
  InsetBlockEnd,
  InsetBlockStart,
  InsetInlineEnd,
  InsetInlineStart,
  JustifyContent,
  Margin,
  MarginBlockEnd,
  MarginBlockStart,
  MarginBottom,
  MarginLeft,
  MarginRight,
  MarginTop,
  Padding,
  PaddingBlock,
  PaddingBottom,
  PaddingInline,
  PaddingLeft,
  PaddingRight,
  PaddingTop,
  Position,
  Width,
} from "../../../lib/theme/props"

export interface BoxProps extends Omit<ComponentPropsWithoutRef<"div">, "color"> {
  /** `align-items` CSS property. */
  alignItems?: AlignItems

  /** Effective element used. Default is `div`. */
  as?: As

  /** Box background color. */
  background?: Background

  /** Block size of the box. */
  blockSize?: BlockSize

  /** Box border radius. */
  borderRadius?: BorderRadius

  /** Box text color */
  color?: Color

  /** `display` CSS property. */
  display?: Display

  /** `flex-direction` CSS property. */
  flexDirection?: FlexDirection

  /** `flex-direction` CSS property. */
  flexGrow?: FlexGrow

  /** `flex-wrap` CSS property. */
  flexWrap?: FlexWrap

  /** Gap between children. */
  gap?: Gap

  /** Box height. */
  height?: Height

  /** Inline size of the box. */
  inlineSize?: InlineSize

  /** Block end inset of the box. */
  insetBlockEnd?: InsetBlockEnd

  /** Block start inset of the box. */
  insetBlockStart?: InsetBlockStart

  /** Inline end inset of the box. */
  insetInlineEnd?: InsetInlineEnd

  /** Inline start inset of the box. */
  insetInlineStart?: InsetInlineStart

  /** `justify-content` CSS property. */
  justifyContent?: JustifyContent

  /** Margin of the box. */
  margin?: Margin

  /** Block end margin of the box. */
  marginBlockEnd?: MarginBlockEnd

  /** Block start margin of the box. */
  marginBlockStart?: MarginBlockStart

  /** Bottom margin of the box. */
  marginBottom?: MarginBottom

  /** Left margin of the box. */
  marginLeft?: MarginLeft

  /** Right margin of the box. */
  marginRight?: MarginRight

  /** Top margin of the box. */
  marginTop?: MarginTop

  /** Padding of the box. */
  padding?: Padding

  /** Block padding of the box. */
  paddingBlock?: PaddingBlock

  /** Bottom padding of the box. */
  paddingBottom?: PaddingBottom

  /** Inline padding of the box. */
  paddingInline?: PaddingInline

  /** Left padding of the box. */
  paddingLeft?: PaddingLeft

  /** Right padding of the box. */
  paddingRight?: PaddingRight

  /** Top padding of the box. */
  paddingTop?: PaddingTop

  /** `position` CSS property. */
  position?: Position

  /** Width of the box. */
  width?: Width
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(({ color, ...props }, forwardedRef) => {
  return <Wrapper textColor={color} {...props} ref={forwardedRef} />
})

interface WrapperProps {
  alignItems?: AlignItems
  background?: Background
  blockSize?: BlockSize
  borderRadius?: BorderRadius
  display?: Display
  flexDirection?: FlexDirection
  flexGrow?: FlexGrow
  flexWrap?: FlexWrap
  gap?: Gap
  height?: Height
  inlineSize?: InlineSize
  insetBlockEnd?: InsetBlockEnd
  insetBlockStart?: InsetBlockStart
  insetInlineEnd?: InsetInlineEnd
  insetInlineStart?: InsetInlineStart
  justifyContent?: JustifyContent
  margin?: Margin
  marginBlockEnd?: MarginBlockEnd
  marginBlockStart?: MarginBlockStart
  marginBottom?: MarginBottom
  marginLeft?: MarginLeft
  marginRight?: MarginRight
  marginTop?: MarginTop
  padding?: Padding
  paddingBlock?: PaddingBlock
  paddingBottom?: PaddingBottom
  paddingInline?: PaddingInline
  paddingLeft?: PaddingLeft
  paddingRight?: PaddingRight
  paddingTop?: PaddingTop
  position?: Position
  textColor: Color | undefined
  width?: Width
}

const Wrapper = styled.div<WrapperProps>`
  align-items: ${({ alignItems }) => alignItems};
  background: ${({ background, theme }) => background && getBackground(background, theme)};
  block-size: ${({ blockSize, theme }) => blockSize && getSpacing(blockSize, theme)};
  border-radius: ${({ borderRadius, theme }) =>
    borderRadius && getBorderRadius(borderRadius, theme)};
  color: ${({ textColor, theme }) => textColor && getColor(textColor, theme)};
  display: ${({ display }) => display};
  flex-direction: ${({ flexDirection }) => flexDirection};
  flex-grow: ${({ flexGrow }) => flexGrow};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  gap: ${({ gap, theme }) => gap && getSpacing(gap, theme)};
  height: ${({ height, theme }) => height && getSpacing(height, theme)};
  inline-size: ${({ inlineSize, theme }) => inlineSize && getSpacing(inlineSize, theme)};
  inset-block-end: ${({ insetBlockEnd, theme }) =>
    insetBlockEnd && getSpacing(insetBlockEnd, theme)};
  inset-block-start: ${({ insetBlockStart, theme }) =>
    insetBlockStart && getSpacing(insetBlockStart, theme)};
  inset-inline-end: ${({ insetInlineEnd, theme }) =>
    insetInlineEnd && getSpacing(insetInlineEnd, theme)};
  inset-inline-start: ${({ insetInlineStart, theme }) =>
    insetInlineStart && getSpacing(insetInlineStart, theme)};
  justify-content: ${({ justifyContent }) => justifyContent};
  margin: ${({ margin, theme }) => margin && getSpacing(margin, theme)};
  margin-block-end: ${({ marginBlockEnd, theme }) =>
    marginBlockEnd && getSpacing(marginBlockEnd, theme)};
  margin-block-start: ${({ marginBlockStart, theme }) =>
    marginBlockStart && getSpacing(marginBlockStart, theme)};
  margin-bottom: ${({ marginBottom, theme }) => marginBottom && getSpacing(marginBottom, theme)};
  margin-left: ${({ marginLeft, theme }) => marginLeft && getSpacing(marginLeft, theme)};
  margin-right: ${({ marginRight, theme }) => marginRight && getSpacing(marginRight, theme)};
  margin-top: ${({ marginTop, theme }) => marginTop && getSpacing(marginTop, theme)};
  padding: ${({ padding, theme }) => padding && getSpacing(padding, theme)};
  padding-block: ${({ paddingBlock, theme }) => paddingBlock && getSpacing(paddingBlock, theme)};
  padding-bottom: ${({ paddingBottom, theme }) =>
    paddingBottom && getSpacing(paddingBottom, theme)};
  padding-inline: ${({ paddingInline, theme }) =>
    paddingInline && getSpacing(paddingInline, theme)};
  padding-left: ${({ paddingLeft, theme }) => paddingLeft && getSpacing(paddingLeft, theme)};
  padding-right: ${({ paddingRight, theme }) => paddingRight && getSpacing(paddingRight, theme)};
  padding-top: ${({ paddingTop, theme }) => paddingTop && getSpacing(paddingTop, theme)};
  position: ${({ position }) => position};
  width: ${({ width, theme }) => width && getSpacing(width, theme)};
`
