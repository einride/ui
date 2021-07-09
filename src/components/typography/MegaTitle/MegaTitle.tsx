import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledText = styled.h1`
  font-size: 80px;
  font-weight: bold;
  line-height: 80px;
  margin-top: 2px;
  margin-bottom: 14px;
  padding: 0;
  color: ${({ theme }) => theme.colors.content.primary};
`;

export interface MegaTitleProps {
  children: ReactNode;
}

export const MegaTitle = ({ children }: MegaTitleProps) => {
  return <StyledText>{children}</StyledText>;
};
