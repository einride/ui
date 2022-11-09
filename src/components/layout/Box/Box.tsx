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
  BorderRadius,
  Color,
  Display,
  FlexDirection,
  FlexGrow,
  FlexWrap,
  Gap,
  Height,
  JustifyContent,
  Margin,
  MarginBottom,
  MarginLeft,
  MarginRight,
  MarginTop,
  Padding,
  PaddingBottom,
  PaddingLeft,
  PaddingRight,
  PaddingTop,
  Width,
} from "../../../lib/theme/props"

export interface BoxProps extends Omit<ComponentPropsWithoutRef<"div">, "color"> {
  /** `align-items` CSS property. */
  alignItems?: AlignItems

  /** Effective element used. Default is `div`. */
  as?: As

  /** Box background color. */
  background?: Background

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

  /** `justify-content` CSS property. */
  justifyContent?: JustifyContent

  /** Margin of the box. */
  margin?: Margin

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

  /** Bottom padding of the box. */
  paddingBottom?: PaddingBottom

  /** Left padding of the box. */
  paddingLeft?: PaddingLeft

  /** Right padding of the box. */
  paddingRight?: PaddingRight

  /** Top padding of the box. */
  paddingTop?: PaddingTop

  /** Width of the box. */
  width?: Width
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(({ color, ...props }, forwardedRef) => {
  return <Wrapper textColor={color} {...props} ref={forwardedRef} />
})

interface WrapperProps {
  alignItems?: AlignItems
  background?: Background
  borderRadius?: BorderRadius
  display?: Display
  flexDirection?: FlexDirection
  flexGrow?: FlexGrow
  flexWrap?: FlexWrap
  gap?: Gap
  height?: Height
  justifyContent?: JustifyContent
  margin?: Margin
  marginBottom?: MarginBottom
  marginLeft?: MarginLeft
  marginRight?: MarginRight
  marginTop?: MarginTop
  padding?: Padding
  paddingBottom?: PaddingBottom
  paddingLeft?: PaddingLeft
  paddingRight?: PaddingRight
  paddingTop?: PaddingTop
  textColor: Color | undefined
  width?: Width
}

const Wrapper = styled.div<WrapperProps>`
  align-items: ${({ alignItems }) => alignItems};
  background: ${({ background, theme }) => background && getBackground(background, theme)};
  border-radius: ${({ borderRadius, theme }) =>
    borderRadius && getBorderRadius(borderRadius, theme)};
  color: ${({ textColor, theme }) => textColor && getColor(textColor, theme)};
  display: ${({ display }) => display};
  flex-direction: ${({ flexDirection }) => flexDirection};
  flex-grow: ${({ flexGrow }) => flexGrow};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  gap: ${({ gap, theme }) => gap && getSpacing(gap, theme)};
  height: ${({ height, theme }) => height && getSpacing(height, theme)};
  justify-content: ${({ justifyContent }) => justifyContent};
  margin: ${({ margin, theme }) => margin && getSpacing(margin, theme)};
  margin-bottom: ${({ marginBottom, theme }) => marginBottom && getSpacing(marginBottom, theme)};
  margin-left: ${({ marginLeft, theme }) => marginLeft && getSpacing(marginLeft, theme)};
  margin-right: ${({ marginRight, theme }) => marginRight && getSpacing(marginRight, theme)};
  margin-top: ${({ marginTop, theme }) => marginTop && getSpacing(marginTop, theme)};
  padding: ${({ padding, theme }) => padding && getSpacing(padding, theme)};
  padding-bottom: ${({ paddingBottom, theme }) =>
    paddingBottom && getSpacing(paddingBottom, theme)};
  padding-left: ${({ paddingLeft, theme }) => paddingLeft && getSpacing(paddingLeft, theme)};
  padding-right: ${({ paddingRight, theme }) => paddingRight && getSpacing(paddingRight, theme)};
  padding-top: ${({ paddingTop, theme }) => paddingTop && getSpacing(paddingTop, theme)};
  width: ${({ width, theme }) => width && getSpacing(width, theme)};
`
