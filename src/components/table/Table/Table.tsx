import { Paragraph } from "../../typography/Paragraph";
import { CustomTable } from "../CustomTable";
import { TableData } from "../TableData";
import { TableHeader } from "../TableHeader";
import { TableRow } from "../TableRow";

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
    <CustomTable
      headers={headers.map((header) => (
        <TableHeader key={header.key.toString()}>
          <Paragraph>{header.displayText}</Paragraph>
        </TableHeader>
      ))}
      rows={rows.map((row) => (
        <TableRow key={row.id} onClick={() => onRowClick?.(row)}>
          {headers.map((header) => (
            <TableData key={header.key.toString()}>
              <Paragraph>{row[header.key]}</Paragraph>
            </TableData>
          ))}
        </TableRow>
      ))}
    />
  );
};
