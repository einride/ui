import styled from "@emotion/styled";
import { ReactNode, TableHTMLAttributes } from "react";

interface TableRootProps extends TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
`;

export const TableRoot = ({ children, ...props }: TableRootProps) => {
  return <StyledTable {...props}>{children}</StyledTable>;
};
