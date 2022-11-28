import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"
import { BackgroundColor } from "../../../lib/theme/types"

interface PrimaryCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Effective element used. */
  as?: ElementType

  /** Background color of the card. Default is `primary`. */
  background?: Background

  /** Card content. */
  children: ReactNode
}

/** @deprecated since 6.56.2. Use `<Card>` instead. */
export const PrimaryCard = forwardRef<HTMLDivElement, PrimaryCardProps>(
  ({ background = "primary", children, ...props }, ref) => {
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
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  padding-inline: ${({ theme }) => 2 * theme.spacer}px;
  padding-block: ${({ theme }) => theme.spacer}px;
`
