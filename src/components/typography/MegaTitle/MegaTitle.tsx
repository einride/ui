import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledText = styled.h1`
  font-size: 80px;
  font-weight: bold;
  line-height: 80px;
  padding-top: 2px;
  padding-bottom: 14px;
`;

export interface MegaTitleProps {
  children: ReactNode;
}

export const MetaTitle = ({ children }: MegaTitleProps) => {
  return <StyledText>{children}</StyledText>;
};
