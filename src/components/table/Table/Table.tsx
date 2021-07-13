import styled from "@emotion/styled";
import { TableHeader } from "../TableHeader";
import { TableRow } from "../TableRow";

const StyledTable = styled.table`
  width: 100%;
`;

const StyledTR = styled.tr<{ isClickable: boolean }>`
  box-shadow: 0px -1px 0px ${({ theme }) => theme.colors.border.primary};
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
}: TableProps<Row, Column>) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          {headers.map((header) => (
            <TableHeader key={header.displayText}>
              {header.displayText}
            </TableHeader>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <StyledTR
            key={JSON.stringify(row)}
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
