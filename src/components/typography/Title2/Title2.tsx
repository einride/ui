import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledText = styled.h2`
  font-size: 28px;
  font-weight: normal;
  line-height: 32px;
  margin-top: 6px;
  margin-bottom: 2px;
  padding: 0;
  color: ${({ theme }) => theme.colors.content.primary};
`;

export interface Title2Props {
  children: ReactNode;
}

export const Title2 = ({ children }: Title2Props) => {
  return <StyledText>{children}</StyledText>;
};
