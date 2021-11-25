import styled from "@emotion/styled"
import * as React from "react"
import { forwardRef, HTMLAttributes, ReactNode } from "react"

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
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
