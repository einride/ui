import styled from "@emotion/styled";
import { ReactNode } from "react";
import { Paragraph } from "../../typography/Paragraph";

const StyledTH = styled.th`
  display: table-cell;
  padding: ${({ theme }) => `${theme.spacer * 3}px ${theme.spacer * 2}px`};
  text-align: left;
`;

export interface TableHeaderProps {
  children: ReactNode;
}

export const TableHeader = ({ children }: TableHeaderProps) => {
  return (
    <StyledTH>
      <Paragraph>{children}</Paragraph>
    </StyledTH>
  );
};
