import isPropValid from "@emotion/is-prop-valid"
import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import {
  getBackground,
  getBorderRadius,
  getColor,
  getFont,
  getSpacing,
} from "../../../lib/theme/prop-system"
import {
  AlignItems,
  AlignSelf,
  As,
  Background,
  BlockSize,
  BorderRadius,
  Color,
  Display,
  FlexDirection,
  FlexGrow,
  FlexShrink,
  FlexWrap,
  FontFamily,
  Gap,
  Height,
  InlineSize,
  InsetBlockEnd,
  InsetBlockStart,
  InsetInlineEnd,
  InsetInlineStart,
  JustifyContent,
  Margin,
  MarginBlock,
  MarginBlockEnd,
  MarginBlockStart,
  MarginBottom,
  MarginInline,
  MarginInlineEnd,
  MarginInlineStart,
  MarginLeft,
  MarginRight,
  MarginTop,
  MaxBlockSize,
  MaxInlineSize,
  MaxWidth,
  Padding,
  PaddingBlock,
  PaddingBottom,
  PaddingInline,
  PaddingLeft,
  PaddingRight,
  PaddingTop,
  PointerEvents,
  Position,
  Width,
} from "../../../lib/theme/props"

export interface BoxProps extends Omit<ComponentPropsWithoutRef<"div">, "color"> {
  /** `align-items` CSS property. */
  alignItems?: AlignItems

  /** `align-self` CSS property. */
  alignSelf?: AlignSelf

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

  /** `flex-grow` CSS property. */
  flexGrow?: FlexGrow

  /** `flex-shrink` CSS property. */
  flexShrink?: FlexShrink

  /** `flex-wrap` CSS property. */
  flexWrap?: FlexWrap

  /** Box font family. */
  fontFamily?: FontFamily

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

  /** Block margin of the box. */
  marginBlock?: MarginBlock

  /** Block end margin of the box. */
  marginBlockEnd?: MarginBlockEnd

  /** Block start margin of the box. */
  marginBlockStart?: MarginBlockStart

  /** Bottom margin of the box. */
  marginBottom?: MarginBottom

  /** Inline margin of the box. */
  marginInline?: MarginInline

  /** Inline end margin of the box. */
  marginInlineEnd?: MarginInlineEnd

  /** Inline start margin of the box. */
  marginInlineStart?: MarginInlineStart

  /** Left margin of the box. */
  marginLeft?: MarginLeft

  /** Right margin of the box. */
  marginRight?: MarginRight

  /** Top margin of the box. */
  marginTop?: MarginTop

  /** Max block size of the box. */
  maxBlockSize?: MaxBlockSize

  /** Max inline size of the box. */
  maxInlineSize?: MaxInlineSize

  /** Max width of the box. */
  maxWidth?: MaxWidth

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

  /** `pointer-events` CSS property. */
  pointerEvents?: PointerEvents

  /** `position` CSS property. */
  position?: Position

  /** Width of the box. */
  width?: Width
}

/** The most primitive component that allows adding inline styles based on theme. */
export const Box = forwardRef<HTMLDivElement, BoxProps>(({ color, ...props }, forwardedRef) => {
  return <Wrapper textColor={color} {...props} ref={forwardedRef} />
})

interface WrapperProps {
  alignItems?: AlignItems
  alignSelf?: AlignSelf
  background?: Background
  blockSize?: BlockSize
  borderRadius?: BorderRadius
  display?: Display
  flexDirection?: FlexDirection
  flexGrow?: FlexGrow
  flexShrink?: FlexShrink
  flexWrap?: FlexWrap
  fontFamily?: FontFamily
  gap?: Gap
  height?: Height
  inlineSize?: InlineSize
  insetBlockEnd?: InsetBlockEnd
  insetBlockStart?: InsetBlockStart
  insetInlineEnd?: InsetInlineEnd
  insetInlineStart?: InsetInlineStart
  justifyContent?: JustifyContent
  margin?: Margin
  marginBlock?: MarginBlock
  marginBlockEnd?: MarginBlockEnd
  marginBlockStart?: MarginBlockStart
  marginBottom?: MarginBottom
  marginInline?: MarginInline
  marginInlineEnd?: MarginInlineEnd
  marginInlineStart?: MarginInlineStart
  marginLeft?: MarginLeft
  marginRight?: MarginRight
  marginTop?: MarginTop
  maxBlockSize?: MaxBlockSize
  maxInlineSize?: MaxInlineSize
  maxWidth?: MaxWidth
  padding?: Padding
  paddingBlock?: PaddingBlock
  paddingBottom?: PaddingBottom
  paddingInline?: PaddingInline
  paddingLeft?: PaddingLeft
  paddingRight?: PaddingRight
  paddingTop?: PaddingTop
  pointerEvents?: PointerEvents
  position?: Position
  textColor: Color | undefined
  width?: Width
}

const validPropsToAvoidForwarding = ["height", "width"] // valid HTML attributes that should not be forwarded

const Wrapper = styled("div", {
  shouldForwardProp: (prop) => isPropValid(prop) && !validPropsToAvoidForwarding.includes(prop),
})<WrapperProps>`
  align-items: ${({ alignItems }) => alignItems};
  align-self: ${({ alignSelf }) => alignSelf};
  background: ${({ background, theme }) => background && getBackground(background, theme)};
  block-size: ${({ blockSize, theme }) => blockSize && getSpacing(blockSize, theme)};
  border-radius: ${({ borderRadius, theme }) =>
    borderRadius && getBorderRadius(borderRadius, theme)};
  color: ${({ textColor, theme }) => textColor && getColor(textColor, theme)};
  display: ${({ display }) => display};
  flex-direction: ${({ flexDirection }) => flexDirection};
  flex-grow: ${({ flexGrow }) => flexGrow};
  flex-shrink: ${({ flexShrink }) => flexShrink};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  font-family: ${({ fontFamily, theme }) => fontFamily && getFont(fontFamily, theme)};
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
  margin-block: ${({ marginBlock, theme }) => marginBlock && getSpacing(marginBlock, theme)};
  margin-block-end: ${({ marginBlockEnd, theme }) =>
    marginBlockEnd && getSpacing(marginBlockEnd, theme)};
  margin-block-start: ${({ marginBlockStart, theme }) =>
    marginBlockStart && getSpacing(marginBlockStart, theme)};
  margin-bottom: ${({ marginBottom, theme }) => marginBottom && getSpacing(marginBottom, theme)};
  margin-inline: ${({ marginInline, theme }) => marginInline && getSpacing(marginInline, theme)};
  margin-inline-end: ${({ marginInlineEnd, theme }) =>
    marginInlineEnd && getSpacing(marginInlineEnd, theme)};
  margin-inline-start: ${({ marginInlineStart, theme }) =>
    marginInlineStart && getSpacing(marginInlineStart, theme)};
  margin-left: ${({ marginLeft, theme }) => marginLeft && getSpacing(marginLeft, theme)};
  margin-right: ${({ marginRight, theme }) => marginRight && getSpacing(marginRight, theme)};
  margin-top: ${({ marginTop, theme }) => marginTop && getSpacing(marginTop, theme)};
  max-block-size: ${({ maxBlockSize, theme }) => maxBlockSize && getSpacing(maxBlockSize, theme)};
  max-inline-size: ${({ maxInlineSize, theme }) =>
    maxInlineSize && getSpacing(maxInlineSize, theme)};
  max-width: ${({ maxWidth, theme }) => maxWidth && getSpacing(maxWidth, theme)};
  padding: ${({ padding, theme }) => padding && getSpacing(padding, theme)};
  padding-block: ${({ paddingBlock, theme }) => paddingBlock && getSpacing(paddingBlock, theme)};
  padding-bottom: ${({ paddingBottom, theme }) =>
    paddingBottom && getSpacing(paddingBottom, theme)};
  padding-inline: ${({ paddingInline, theme }) =>
    paddingInline && getSpacing(paddingInline, theme)};
  padding-left: ${({ paddingLeft, theme }) => paddingLeft && getSpacing(paddingLeft, theme)};
  padding-right: ${({ paddingRight, theme }) => paddingRight && getSpacing(paddingRight, theme)};
  padding-top: ${({ paddingTop, theme }) => paddingTop && getSpacing(paddingTop, theme)};
  pointer-events: ${({ pointerEvents }) => pointerEvents};
  position: ${({ position }) => position};
  width: ${({ width, theme }) => width && getSpacing(width, theme)};
`
