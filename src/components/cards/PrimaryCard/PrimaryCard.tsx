import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes, ReactNode } from "react"
import { BackgroundColor } from "../../../lib/theme/types"

export interface PrimaryCardProps extends HTMLAttributes<HTMLDivElement> {
  background?: Background
  children: ReactNode
}

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

const Wrapper = styled.div<{
  background: Background
}>`
  background: ${({ background, theme }) => theme.colors.background[background]};
  border-radius: ${({ theme }) => 2 * theme.spacer}px;
  padding: ${({ theme }) => theme.spacer}px ${({ theme }) => 2 * theme.spacer}px;
`
