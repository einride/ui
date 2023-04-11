import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, ElementType, forwardRef, ReactNode } from "react"
import { ColorScheme, useColorScheme } from "../../../contexts/ColorSchemeProvider"
import { getBackground, getColor } from "../../../lib/theme/prop-system"
import { Background, Color } from "../../../lib/theme/props"
import { Theme } from "../../../lib/theme/types"

export interface LabelProps extends Omit<ComponentPropsWithoutRef<"span">, "color"> {
  /** Effective element used. */
  as?: ElementType

  /** Background color of the label. Default is `secondary`. */
  background?: Exclude<Background, "primary" | "focus">

  /** Content of the label. */
  children: ReactNode

  /** Text color of the label. */
  color?: Color

  /** Variant of the label. Default is `secondary`. */
  variant?: Variant
}

/** Small pill-like label. */
export const Label = forwardRef<HTMLSpanElement, LabelProps>(
  ({ children, color, variant = "secondary", ...props }, ref) => {
    const colorScheme = useColorScheme()
    return (
      <StyledSpan
        colorScheme={colorScheme.colorScheme}
        variant={variant}
        textColor={color}
        {...props}
        ref={ref}
      >
        {children}
      </StyledSpan>
    )
  },
)

export type Variant = Extract<
  Background,
  | "primary"
  | "secondary"
  | "tertiary"
  | "positive"
  | "warning"
  | "negative"
  | "accent1"
  | "accent2"
  | "accent3"
>

interface StyledSpanProps {
  background?: Background
  colorScheme: ColorScheme
  variant: Variant
  textColor: Color | undefined
}

const StyledSpan = styled.span<StyledSpanProps>`
  background: ${({ background, variant, theme }) =>
    background ? getBackground(background, theme) : getBackground(variant, theme)};
  color: ${({ variant, colorScheme, textColor, theme }) =>
    textColor ? getColor(textColor, theme) : getColorFromVariant(colorScheme, variant, theme)};
  padding-block: ${({ theme }) => 0.5 * theme.spacingBase}rem;
  padding-inline: ${({ theme }) => theme.spacingBase}rem;
  border-radius: ${({ theme }) => theme.borderRadii.sm};
`

const getColorFromVariant = (colorScheme: ColorScheme, variant: Variant, theme: Theme): string => {
  switch (variant) {
    case "primary":
    case "secondary":
    case "tertiary":
      return theme.colors.content.primary
    case "warning":
    case "accent3":
      return colorScheme === "dark"
        ? theme.colors.content.primaryInverted
        : theme.colors.content.primary
    default:
      return theme.colors.content.primaryInverted
  }
}
