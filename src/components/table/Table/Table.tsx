import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  as?: ElementType
  children: ReactNode
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledTable {...props} ref={ref}>
        {children}
      </StyledTable>
    )
  },
)

const StyledTable = styled.table`
  width: 100%;
`
