import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"

export interface TheadProps extends HTMLAttributes<HTMLTableSectionElement> {
  /** Effective element used. */
  as?: ElementType

  /** Content of the table head. */
  children?: ReactNode
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
