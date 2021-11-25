import styled from "@emotion/styled"
import * as React from "react"
import { Paragraph } from "../../typography/Paragraph/Paragraph"

export interface ComposedTableProps<Row, Column> {
  headers: {
    displayText: string
    key: Column
  }[]
  onRowClick?: (row: Row) => void
  rows: Row[]
}

export const ComposedTable = <Row, Column extends keyof Row>({
  headers,
  onRowClick,
  rows,
}: ComposedTableProps<Row & { id: string }, Column>) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          {headers.map((header) => (
            <StyledTh key={header.key.toString()}>
              <Paragraph>{header.displayText}</Paragraph>
            </StyledTh>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <StyledTr
            key={row.id}
            onClick={() => onRowClick?.(row)}
            isClickable={!!onRowClick}
          >
            {headers.map((header) => (
              <StyledTd key={header.key.toString()}>
                <Paragraph> {row[header.key]}</Paragraph>
              </StyledTd>
            ))}
          </StyledTr>
        ))}
      </tbody>
    </StyledTable>
  )
}

const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
`

const StyledTr = styled.tr<{ isClickable: boolean }>`
  box-shadow: 0 -1px 0 ${({ theme }) => theme.colors.border.primary};
  ${({ isClickable }) => isClickable && "cursor: pointer"};
`

const StyledTh = styled.th`
  display: table-cell;
  padding: ${({ theme }) => `${theme.spacer * 3}px ${theme.spacer * 2}px`};
  text-align: left;
`

const StyledTd = styled.td`
  display: table-cell;
  padding-top: ${({ theme }) => 3 * theme.spacer}px;
  padding-right: ${({ theme }) => 2 * theme.spacer}px;
  padding-bottom: ${({ theme }) => 3 * theme.spacer}px;
  padding-left: ${({ theme }) => 2 * theme.spacer}px;
`
