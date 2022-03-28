import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes, ReactNode } from "react"

export interface SecondaryCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  isElevated?: boolean
}

export const SecondaryCard = forwardRef<HTMLDivElement, SecondaryCardProps>(
  ({ children, ...props }, ref) => {
    return (
      <Wrapper {...props} ref={ref}>
        {children}
      </Wrapper>
    )
  },
)

const Wrapper = styled.div<{ isElevated?: boolean }>`
  background: ${({ isElevated, theme }) =>
    isElevated
      ? theme.colors.background.primary
      : theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.spacer}px;
  padding: ${({ theme }) => theme.spacer}px;
  padding-top: 0;
  overflow: hidden;
`
