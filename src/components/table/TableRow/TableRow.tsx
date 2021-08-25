import styled from "@emotion/styled";
import { TableHTMLAttributes } from "react";

interface TableRowProps extends TableHTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode;
}

const StyledTR = styled.tr`
  border-top: 1px solid ${({ theme }) => theme.colors.border.primary};
  ${({ onClick }) => onClick && "cursor: pointer"};
`;

export const TableRow = ({ children, ...props }: TableRowProps) => {
  return <StyledTR {...props}>{children}</StyledTR>;
};
