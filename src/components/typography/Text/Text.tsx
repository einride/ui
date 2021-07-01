import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledText = styled.p`
  font-size: 18px;
  font-weight: normal;
  line-height: 24px;
  padding-top: 5px;
  padding-bottom: 3px;
`;

export interface TextProps {
  children: ReactNode;
}

export const Text = ({ children }: TextProps) => {
  return <StyledText>{children}</StyledText>;
};
