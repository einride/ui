import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes } from "react"
import { getColor, getFont } from "../../../lib/theme/prop-system"
import { As, Color, FontFamily, FontWeight, TextDecoration } from "../../../lib/theme/props"
import { Theme } from "../../../lib/theme/types"

export interface TextProps extends Omit<HTMLAttributes<HTMLParagraphElement>, "color"> {
  /** Rendered element. */
  as?: As

  /** Text color. */
  color?: Color

  /** Text font. */
  font?: FontFamily

  /** `text-decoration` CSS property. */
  textDecoration?: TextDecoration

  /** Text variant. */
  variant?: Variant

  /** Text weight. */
  weight?: FontWeight
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(
  ({ children, color, ...props }, ref) => {
    const as = getAs(props.variant)
    return (
      <StyledText as={as} textColor={color} {...props} ref={ref}>
        {children}
      </StyledText>
    )
  },
)

type Variant = "bodySm" | "bodyMd" | "titleSm" | "titleMd" | "titleLg" | "titleXl"

interface StyledTextProps {
  font?: FontFamily
  textColor: Color | undefined
  variant?: Variant
  textDecoration?: TextDecoration
  weight?: FontWeight
}

const StyledText = styled.p<StyledTextProps>`
  color: ${({ textColor, theme }) => textColor && getColor(textColor, theme)};
  font-family: ${({ font, theme }) => font && getFont(font, theme)};
  font-size: ${({ variant, theme }) => variant && getFontSize(theme, variant)};
  font-weight: ${({ theme, variant, weight }) => getFontWeight(theme, variant, weight)};
  line-height: ${({ variant }) => getLineHeight(variant)};
  padding-block: ${({ variant }) => getPaddingBlock(variant)};
  text-decoration: ${({ textDecoration }) => textDecoration};
`

const getAs = (variant?: Variant): ElementType => {
  switch (variant) {
    case "titleXl":
    case "titleLg":
    case "titleMd":
    case "titleSm":
      return "h2"
    case "bodyMd":
    case "bodySm":
    default:
      return "p"
  }
}

const getFontSize = (theme: Theme, variant: Variant): string => {
  switch (variant) {
    case "titleXl":
      return theme.fontSizes["3xl"]
    case "titleLg":
      return theme.fontSizes["2xl"]
    case "titleMd":
      return theme.fontSizes.xl
    case "titleSm":
      return theme.fontSizes.lg
    case "bodyMd":
      return theme.fontSizes.md
    case "bodySm":
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
    case "titleXl":
      return theme.fontWeights.medium
    case "titleLg":
      return theme.fontWeights.medium
    case "titleMd":
      return theme.fontWeights.medium
    case "titleSm":
      return theme.fontWeights.medium
    case "bodyMd":
      return theme.fontWeights.book
    case "bodySm":
      return theme.fontWeights.book
    default:
      return theme.fontWeights.book
  }
}

const getLineHeight = (variant: Variant | undefined): string => {
  switch (variant) {
    case "titleXl":
      return "1"
    case "titleLg":
      return "calc(6 / 5)"
    case "titleMd":
      return "calc(8 / 7)"
    case "titleSm":
      return "calc(4 / 3)"
    case "bodyMd":
      return "calc(4 / 3)"
    case "bodySm":
      return "calc(8 / 7)"
    default:
      return "calc(4 / 3)"
  }
}

const getPaddingBlock = (variant: Variant | undefined): string => {
  switch (variant) {
    case "titleXl":
      return "2px 6px"
    case "titleLg":
      return "1px 7px"
    case "titleMd":
      return "6px 2px"
    case "titleSm":
      return "7px 1px"
    case "bodyMd":
      return "5px 3px"
    case "bodySm":
      return "3px 5px"
    default:
      return "5px 3px"
  }
}
