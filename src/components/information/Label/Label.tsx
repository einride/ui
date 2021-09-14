import styled from "@emotion/styled"
import * as React from "react"
import { HTMLAttributes, ReactNode } from "react"
import { Theme } from "../../../theme"

const getBackgroundColor = (theme: Theme, variant?: Variant) => {
  switch (variant) {
    case "default":
      return theme.colors.background.secondary
    case "accent":
      return theme.colors.background.accent
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
    case "accent":
      return theme.colors.content.accent
    case "positive":
      return theme.colors.content.positive
    case "negative":
      return theme.colors.content.negative
    default:
      return theme.colors.content.secondary
  }
}

const StyledSpan = styled.span<LabelProps>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  background-color: ${({ theme, variant }) =>
    getBackgroundColor(theme, variant)};
  color: ${({ theme, variant }) => getColor(theme, variant)};
  padding: ${({ theme }) => `${theme.spacer / 2}px ${theme.spacer}px`};
  border-radius: 2px;
`

type Variant = "default" | "accent" | "positive" | "negative"

export interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
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
