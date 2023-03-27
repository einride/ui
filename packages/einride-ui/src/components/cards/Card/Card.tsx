import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, ElementType, forwardRef } from "react"
import { getBackground, getBorderRadius, getSpacing } from "../../../lib/theme/prop-system"
import { Background, BorderRadius, PaddingBlockEnd } from "../../../lib/theme/props"

export interface CardProps extends ComponentPropsWithoutRef<"div"> {
  /** Effective element used. */
  as?: ElementType

  /** Background color of the card. Default is `primary`. */
  background?: Background

  /** Border radius of the card. Default is `lg`. */
  borderRadius?: BorderRadius

  /** Padding block end of the card. */
  paddingBlockEnd?: PaddingBlockEnd
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ background = "primary", borderRadius = "lg", children, ...props }, ref) => {
    return (
      <Wrapper background={background} borderRadius={borderRadius} {...props} ref={ref}>
        {children}
      </Wrapper>
    )
  },
)

interface WrapperProps {
  background: Background
  borderRadius: BorderRadius
  paddingBlockEnd?: PaddingBlockEnd
}

export const Wrapper = styled.div<WrapperProps>`
  background: ${({ background, theme }) => getBackground(background, theme)};
  border-radius: ${({ borderRadius, theme }) => getBorderRadius(borderRadius, theme)};
  padding-inline: ${({ theme }) => theme.spacing.sm};
  padding-block: ${({ theme }) => theme.spacing.xs};
  padding-block-end: ${({ paddingBlockEnd, theme }) =>
    paddingBlockEnd && getSpacing(paddingBlockEnd, theme)};
`
