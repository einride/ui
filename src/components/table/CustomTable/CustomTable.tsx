import { CSSProperties, ReactNode } from "react";
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
      <thead style={style?.thead}>
        <tr style={style?.theadRow}>{headers}</tr>
      </thead>
      <tbody style={style?.tbody}>{rows}</tbody>
    </TableRoot>
  );
};
