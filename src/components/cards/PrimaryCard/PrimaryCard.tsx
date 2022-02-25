import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes, ReactNode } from "react"

export interface PrimaryCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const PrimaryCard = forwardRef<HTMLDivElement, PrimaryCardProps>(
  ({ children, ...props }, ref) => {
    return (
      <Wrapper {...props} ref={ref}>
        {children}
      </Wrapper>
    )
  },
)

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => 2 * theme.spacer}px;
  padding: ${({ theme }) => 2 * theme.spacer}px;
  padding-top: ${({ theme }) => theme.spacer}px;
`
