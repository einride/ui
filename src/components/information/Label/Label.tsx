import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"
import { Theme } from "../../../lib/theme/types"

interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
  /** Effective element used. */
  as?: ElementType

  /** Content of the label. */
  children: ReactNode

  /** Color variant of the label. Default is `primary`. */
  variant?: LabelVariant
}

export const Label = forwardRef<HTMLSpanElement, LabelProps>(
  ({ children, variant = "primary", ...props }, ref) => {
    return (
      <StyledSpan variant={variant} {...props} ref={ref}>
        {children}
      </StyledSpan>
    )
  },
)

const getBackground = (theme: Theme, variant?: LabelVariant): string => {
  switch (variant) {
    case "primary":
      return theme.colors.background.secondary
    case "positive":
      return theme.colors.background.positive
    case "negative":
      return theme.colors.background.negative
    default:
      return theme.colors.background.secondary
  }
}

const getColor = (theme: Theme, variant?: LabelVariant): string => {
  switch (variant) {
    case "primary":
      return theme.colors.content.primary
    case "positive":
      return theme.colors.content.positive
    case "negative":
      return theme.colors.content.negative
    default:
      return theme.colors.content.primary
  }
}

const StyledSpan = styled.span<{ variant: LabelVariant }>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  background: ${({ theme, variant }) => getBackground(theme, variant)};
  color: ${({ theme, variant }) => getColor(theme, variant)};
  padding-block: ${({ theme }) => theme.spacer / 2}px;
  padding-inline: ${({ theme }) => theme.spacer}px;
  border-radius: ${({ theme }) => theme.borderRadii.sm};
`

export type LabelVariant = "primary" | "positive" | "negative"
