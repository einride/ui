import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledText = styled.h2`
  font-size: 28px;
  font-weight: normal;
  line-height: 32px;
  padding-top: 6px;
  padding-bottom: 2px;
`;

export interface HeadingProps {
  children: ReactNode;
}

export const Heading = ({ children }: HeadingProps) => {
  return <StyledText>{children}</StyledText>;
};
