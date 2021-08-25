import styled from "@emotion/styled";
import { ReactNode, TableHTMLAttributes } from "react";

const StyledTD = styled.td`
  display: table-cell;
  padding-top: ${({ theme }) => `${theme.spacer * 3 - 1}px`};
  padding-bottom: ${({ theme }) => `${theme.spacer * 3}px`};
  padding-left: ${({ theme }) => `${theme.spacer * 2}px`};
  padding-right: ${({ theme }) => `${theme.spacer * 2}px`};
`;

interface TableDataProps extends TableHTMLAttributes<HTMLTableDataCellElement> {
  children: ReactNode;
}

export const TableData = ({ children, ...props }: TableDataProps) => {
  return <StyledTD {...props}>{children}</StyledTD>;
};
