import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /** Effective element used. */
  as?: ElementType

  /** Content of the table. */
  children?: ReactNode
}

export const Table = forwardRef<HTMLTableElement, TableProps>(({ children, ...props }, ref) => {
  return (
    <StyledTable {...props} ref={ref}>
      {children}
    </StyledTable>
  )
})

const StyledTable = styled.table`
  width: 100%;
`
