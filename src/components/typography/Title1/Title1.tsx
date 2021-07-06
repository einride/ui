import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledText = styled.h1`
  font-size: 40px;
  font-weight: bold;
  line-height: 48px;
  padding-top: 1px;
  padding-bottom: 7px;
  color: ${({ theme }) => theme.colors.content.primary};
`;

export interface Title1Props {
  children: ReactNode;
}

export const Title1 = ({ children }: Title1Props) => {
  return <StyledText>{children}</StyledText>;
};
