import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"
import { BackgroundColor } from "../../../lib/theme/types"

export interface SecondaryCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Effective element used. */
  as?: ElementType

  /** Background color of the card. Default is `secondary`. */
  background?: Background

  /** Card content. */
  children: ReactNode
}

export const SecondaryCard = forwardRef<HTMLDivElement, SecondaryCardProps>(
  ({ background = "secondary", children, ...props }, ref) => {
    return (
      <Wrapper background={background} {...props} ref={ref}>
        {children}
      </Wrapper>
    )
  },
)

type Background = Exclude<BackgroundColor, "focus">

const Wrapper = styled.div<{ background: Background }>`
  background: ${({ background, theme }) => theme.colors.background[background]};
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  padding-inline: ${({ theme }) => theme.spacer}px;
  padding-block-end: ${({ theme }) => theme.spacer}px;
  overflow: hidden;
`
