import { ReactNode, TableHTMLAttributes } from "react";

interface TableHeadRowProps extends TableHTMLAttributes<HTMLTableRowElement> {
  children: ReactNode;
}

export const TableHeadRow = ({ children, ...props }: TableHeadRowProps) => {
  return <tr {...props}>{children}</tr>;
};
