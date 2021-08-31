import { CSSProperties, ReactNode } from "react";
import { TableBody } from "../TableBody";
import { TableHead } from "../TableHead";
import { TableHeadRow } from "../TableHeadRow";
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
        <TableHeadRow style={style?.theadRow}>{headers}</TableHeadRow>
      </TableHead>
      <TableBody style={style?.tbody}>{rows}</TableBody>
    </TableRoot>
  );
};
