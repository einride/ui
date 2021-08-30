import styled from "@emotion/styled";
import * as React from "react";
import { TableHeader } from "../TableHeader";
import { TableRow } from "../TableRow";

const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
`;

const StyledTR = styled.tr<{ isClickable: boolean }>`
  border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
  ${({ isClickable }) => isClickable && "cursor: pointer"};
`;

export interface TableProps<Row, Column> {
  headers: {
    displayText: string;
    key: Column;
  }[];
  onRowClick?: (row: Row) => void;
  rows: Row[];
}

export const Table = <Row, Column extends keyof Row>({
  headers,
  onRowClick,
  rows,
}: TableProps<Row & { id: string }, Column>) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          {headers.map((header) => (
            <TableHeader key={header.key.toString()}>
              {header.displayText}
            </TableHeader>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <StyledTR
            key={row.id}
            onClick={() => onRowClick?.(row)}
            isClickable={!!onRowClick}
          >
            {headers.map((header) => (
              <TableRow key={header.key.toString()}>{row[header.key]}</TableRow>
            ))}
          </StyledTR>
        ))}
      </tbody>
    </StyledTable>
  );
};
