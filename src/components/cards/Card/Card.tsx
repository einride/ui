import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, ElementType, forwardRef } from "react"
import { isInArray } from "../../../lib/theme/guard"
import { Background, PaddingBlockEnd } from "../../../lib/theme/props"
import { backgroundColors, spacings, Theme } from "../../../lib/theme/types"

interface CardProps extends ComponentPropsWithoutRef<"div"> {
  /** Effective element used. */
  as?: ElementType

  /** Background color of the card. Default is `primary`. */
  background?: Background

  /** Padding block end of the card. */
  paddingBlockEnd?: PaddingBlockEnd
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ background = "primary", children, ...props }, ref) => {
    return (
      <Wrapper background={background} {...props} ref={ref}>
        {children}
      </Wrapper>
    )
  },
)

interface WrapperProps {
  background: Background
  paddingBlockEnd?: PaddingBlockEnd
}

const Wrapper = styled.div<WrapperProps>`
  background: ${({ background, theme }) => getBackground(background, theme)};
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  padding-inline: ${({ theme }) => theme.spacing.sm};
  padding-block: ${({ theme }) => theme.spacing};
  padding-block-end: ${({ paddingBlockEnd, theme }) =>
    paddingBlockEnd && getPaddingBlockEnd(paddingBlockEnd, theme)};
`

const getBackground = (background: Background, theme: Theme): string => {
  if (isInArray(background, backgroundColors)) return theme.colors.background[background]
  return background.toString()
}

const getPaddingBlockEnd = (paddingBlockEnd: PaddingBlockEnd, theme: Theme): string => {
  if (typeof paddingBlockEnd === "number") return `${paddingBlockEnd * theme.spacingBase}rem`
  if (isInArray(paddingBlockEnd, spacings)) return theme.spacing[paddingBlockEnd]
  return paddingBlockEnd.toString()
}
