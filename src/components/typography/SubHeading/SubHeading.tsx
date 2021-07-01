import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledText = styled.h3`
  font-size: 24px;
  font-weight: normal;
  line-height: 32px;
  padding-top: 7px;
  padding-bottom: 1px;
`;

export interface SubHeadingProps {
  children: ReactNode;
}

export const SubHeading = ({ children }: SubHeadingProps) => {
  return <StyledText>{children}</StyledText>;
};
