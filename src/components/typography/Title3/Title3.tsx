import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledText = styled.h3`
  font-size: 24px;
  font-weight: normal;
  line-height: 32px;
  padding-top: 7px;
  padding-bottom: 1px;
`;

export interface Title3Props {
  children: ReactNode;
}

export const Title3 = ({ children }: Title3Props) => {
  return <StyledText>{children}</StyledText>;
};
