import styled from "@emotion/styled"
import * as React from "react"
import { forwardRef, HTMLAttributes, ReactNode } from "react"

export interface TheadProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode
}

export const Thead = forwardRef<HTMLTableSectionElement, TheadProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledThead {...props} ref={ref}>
        {children}
      </StyledThead>
    )
  },
)

const StyledThead = styled.thead`
  tr {
    box-shadow: unset;
  }
`
