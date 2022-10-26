import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"
import { isInArray } from "../../../lib/theme/guard"
import { As, Color, FontFamily, FontWeight } from "../../../lib/theme/props"
import { contentColors, fonts, Theme } from "../../../lib/theme/types"

interface TextProps extends Omit<HTMLAttributes<HTMLParagraphElement>, "color"> {
  /** Effective element used. */
  as: As

  /** Text color. */
  color?: Color

  /** Text font. */
  font?: FontFamily

  /* Text variant. */
  variant?: Variant

  /** Text weight. */
  weight?: FontWeight
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ children, color, ...props }, ref) => {
    return (
      <StyledText textColor={color} {...props} ref={ref}>
        {children}
      </StyledText>
    )
  },
)

type Variant = "body-sm" | "body-md" | "title-sm" | "title-md" | "title-lg" | "title-xl"

interface StyledTextProps {
  font?: FontFamily
  textColor: Color | undefined
  variant?: Variant
  weight?: FontWeight
}

const StyledText = styled.p<StyledTextProps>`
  color: ${({ textColor, theme }) => textColor && getColor(textColor, theme)};
  font-family: ${({ font, theme }) => font && getFont(font, theme)};
  font-size: ${({ variant, theme }) => variant && getFontSize(theme, variant)};
  font-weight: ${({ theme, variant, weight }) => getFontWeight(theme, variant, weight)};
  line-height: ${({ variant }) => getLineHeight(variant)};
  padding-block: ${({ variant }) => getPaddingBlock(variant)};
`

const getColor = (textColor: Color, theme: Theme): string => {
  if (isInArray(textColor, contentColors)) return theme.colors.content[textColor]
  return textColor.toString()
}

const getFont = (font: FontFamily, theme: Theme): string => {
  if (isInArray(font, fonts)) return theme.fonts[font]
  return font.toString()
}

const getFontSize = (theme: Theme, variant: Variant): string => {
  switch (variant) {
    case "title-xl":
      return theme.fontSizes["3xl"]
    case "title-lg":
      return theme.fontSizes["2xl"]
    case "title-md":
      return theme.fontSizes.xl
    case "title-sm":
      return theme.fontSizes.lg
    case "body-md":
      return theme.fontSizes.md
    case "body-sm":
      return theme.fontSizes.sm
    default:
      return theme.fontSizes.md
  }
}

const getFontWeight = (
  theme: Theme,
  variant: Variant | undefined,
  weight: FontWeight | number | undefined,
): number => {
  if (typeof weight === "number") return weight
  if (weight) return theme.fontWeights[weight]
  switch (variant) {
    case "title-xl":
      return theme.fontWeights.medium
    case "title-lg":
      return theme.fontWeights.medium
    case "title-md":
      return theme.fontWeights.medium
    case "title-sm":
      return theme.fontWeights.medium
    case "body-md":
      return theme.fontWeights.book
    case "body-sm":
      return theme.fontWeights.book
    default:
      return theme.fontWeights.book
  }
}

const getLineHeight = (variant: Variant | undefined): string => {
  switch (variant) {
    case "title-xl":
      return "1"
    case "title-lg":
      return "calc(6 / 5)"
    case "title-md":
      return "calc(8 / 7)"
    case "title-sm":
      return "calc(4 / 3)"
    case "body-md":
      return "calc(4 / 3)"
    case "body-sm":
      return "calc(8 / 7)"
    default:
      return "calc(4 / 3)"
  }
}

const getPaddingBlock = (variant: Variant | undefined): string => {
  switch (variant) {
    case "title-xl":
      return "2px 6px"
    case "title-lg":
      return "1px 7px"
    case "title-md":
      return "6px 2px"
    case "title-sm":
      return "7px 1px"
    case "body-md":
      return "5px 3px"
    case "body-sm":
      return "3px 5px"
    default:
      return "5px 3px"
  }
}
