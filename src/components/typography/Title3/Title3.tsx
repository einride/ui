import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledText = styled.h3`
  font-size: 24px;
  font-weight: normal;
  line-height: 32px;
  margin-top: 7px;
  margin-bottom: 1px;
  padding: 0;
  color: ${({ theme }) => theme.colors.content.primary};
`;

export interface Title3Props {
  children: ReactNode;
}

export const Title3 = ({ children }: Title3Props) => {
  return <StyledText>{children}</StyledText>;
};
