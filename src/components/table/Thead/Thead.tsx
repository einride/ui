import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"

export interface TheadProps extends HTMLAttributes<HTMLTableSectionElement> {
  as?: ElementType
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
    border-block-start: none;
  }
`
