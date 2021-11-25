import styled from "@emotion/styled"
import * as React from "react"
import { forwardRef, HTMLAttributes, ReactNode } from "react"

interface TrProps extends HTMLAttributes<HTMLTableRowElement> {
  children: ReactNode
}

export const Tr = forwardRef<HTMLTableRowElement, TrProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledTr {...props} ref={ref}>
        {children}
      </StyledTr>
    )
  },
)

const StyledTr = styled.tr`
  box-shadow: 0 -1px 0 ${({ theme }) => theme.colors.border.primary};
`
