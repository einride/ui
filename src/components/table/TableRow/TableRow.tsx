import styled from "@emotion/styled"
import * as React from "react"
import { ReactNode } from "react"
import { Paragraph } from "../../typography/Paragraph"

const StyledTD = styled.td`
  display: table-cell;
  padding-top: ${({ theme }) => `${theme.spacer * 3 - 1}px`};
  padding-bottom: ${({ theme }) => `${theme.spacer * 3}px`};
  padding-left: ${({ theme }) => `${theme.spacer * 2}px`};
  padding-right: ${({ theme }) => `${theme.spacer * 2}px`};
`

export interface TableRowProps {
  children: ReactNode
}

export const TableRow = ({ children }: TableRowProps) => {
  return (
    <StyledTD>
      <Paragraph>{children}</Paragraph>
    </StyledTD>
  )
}
