import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, ElementType, forwardRef } from "react"
import { isInArray } from "../../../lib/theme/guard"
import { Background, BorderRadius, PaddingBlockEnd } from "../../../lib/theme/props"
import { backgroundColors, borderRadii, spacings, Theme } from "../../../lib/theme/types"

interface CardProps extends ComponentPropsWithoutRef<"div"> {
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
    paddingBlockEnd && getPaddingBlockEnd(paddingBlockEnd, theme)};
`

const getBackground = (background: Background, theme: Theme): string => {
  if (isInArray(background, backgroundColors)) return theme.colors.background[background]
  return background.toString()
}

const getBorderRadius = (borderRadius: BorderRadius, theme: Theme): string => {
  if (typeof borderRadius === "number") return `${borderRadius * theme.spacingBase}rem`
  if (isInArray(borderRadius, borderRadii)) return theme.borderRadii[borderRadius]
  return borderRadius.toString()
}

const getPaddingBlockEnd = (paddingBlockEnd: PaddingBlockEnd, theme: Theme): string => {
  if (typeof paddingBlockEnd === "number") return `${paddingBlockEnd * theme.spacingBase}rem`
  if (isInArray(paddingBlockEnd, spacings)) return theme.spacing[paddingBlockEnd]
  return paddingBlockEnd.toString()
}
