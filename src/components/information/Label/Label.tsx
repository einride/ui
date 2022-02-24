import styled from "@emotion/styled"
import { ElementType, HTMLAttributes, ReactNode } from "react"
import { Theme } from "../../../lib/theme/theme"

export interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
  as?: ElementType
  children: ReactNode
  variant?: Variant
}

export const Label = ({
  children,
  variant = "default",
  ...props
}: LabelProps) => {
  return (
    <StyledSpan variant={variant} {...props}>
      {children}
    </StyledSpan>
  )
}
const getBackground = (theme: Theme, variant?: Variant) => {
  switch (variant) {
    case "default":
      return theme.colors.background.secondary
    case "positive":
      return theme.colors.background.positive
    case "negative":
      return theme.colors.background.negative
    default:
      return theme.colors.background.secondary
  }
}

const getColor = (theme: Theme, variant?: Variant) => {
  switch (variant) {
    case "default":
      return theme.colors.content.primary
    case "positive":
      return theme.colors.content.positive
    case "negative":
      return theme.colors.content.negative
    default:
      return theme.colors.content.primary
  }
}

const StyledSpan = styled.span<LabelProps>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  background: ${({ theme, variant }) => getBackground(theme, variant)};
  color: ${({ theme, variant }) => getColor(theme, variant)};
  padding: ${({ theme }) => `${theme.spacer / 2}px ${theme.spacer}px`};
  border-radius: 2px;
`

type Variant = "default" | "positive" | "negative"
