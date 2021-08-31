import { CSSProperties, ReactNode } from "react";
import { TableHead } from "../TableHead";
import { TableRoot } from "../TableRoot";

interface CustomTableProps {
  headers: ReactNode;
  rows: ReactNode;
  style?: {
    root?: CSSProperties;
    thead?: CSSProperties;
    theadRow?: CSSProperties;
    tbody?: CSSProperties;
  };
}

export const CustomTable = ({ headers, rows, style }: CustomTableProps) => {
  return (
    <TableRoot style={style?.root}>
      <TableHead style={style?.thead}>
        <tr style={style?.theadRow}>{headers}</tr>
      </TableHead>
      <tbody style={style?.tbody}>{rows}</tbody>
    </TableRoot>
  );
};
