import styled from "@emotion/styled";
import { TableHeader } from "../TableHeader";
import { TableRow } from "../TableRow";

const StyledTable = styled.table`
  width: 100%;
`;

const StyledTR = styled.tr`
  box-shadow: 0px -1px 0px ${({ theme }) => theme.colors.border.primary};
`;

export interface TableProps<Row, Column> {
  headers: {
    displayText: string;
    key: Column;
  }[];
  rows: Row[];
}

export const Table = <Row, Column extends keyof Row>({
  headers,
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
          <StyledTR key={JSON.stringify(row)}>
            {headers.map((header) => (
              <TableRow key={header.key.toString()}>{row[header.key]}</TableRow>
            ))}
          </StyledTR>
        ))}
      </tbody>
    </StyledTable>
  );
};
