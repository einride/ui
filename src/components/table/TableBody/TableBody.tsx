import { ReactNode, TableHTMLAttributes } from "react";

interface TableBodyProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export const TableBody = ({ children, ...props }: TableBodyProps) => {
  return <tbody {...props}>{children}</tbody>;
};
