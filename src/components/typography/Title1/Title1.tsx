import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledText = styled.h1`
  font-size: 40px;
  font-weight: bold;
  line-height: 48px;
  margin-top: 1px;
  margin-bottom: 7px;
  padding: 0;
  color: ${({ theme }) => theme.colors.content.primary};
`;

export interface Title1Props {
  children: ReactNode;
}

export const Title1 = ({ children }: Title1Props) => {
  return <StyledText>{children}</StyledText>;
};
