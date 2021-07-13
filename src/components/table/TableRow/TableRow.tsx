import styled from "@emotion/styled";
import { ReactNode } from "react";
import { Paragraph } from "../../typography/Paragraph";

const StyledTD = styled.td`
  display: table-cell;
  padding: ${({ theme }) => `${theme.spacer * 3}px ${theme.spacer * 2}px`};
`;

export interface TableRowProps {
  children: ReactNode;
}

export const TableRow = ({ children }: TableRowProps) => {
  return (
    <StyledTD>
      <Paragraph>{children}</Paragraph>
    </StyledTD>
  );
};
