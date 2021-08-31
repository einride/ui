import { ReactNode, TableHTMLAttributes } from "react";

interface TableHeadProps extends TableHTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

export const TableHead = ({ children, ...props }: TableHeadProps) => {
  return <thead {...props}>{children}</thead>;
};
