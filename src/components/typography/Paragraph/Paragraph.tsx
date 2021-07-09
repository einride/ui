import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledText = styled.p`
  font-size: 18px;
  font-weight: normal;
  line-height: 24px;
  margin-top: 5px;
  margin-bottom: 3px;
  padding: 0;
  color: ${({ theme }) => theme.colors.content.primary};
`;

export interface ParagraphProps {
  children: ReactNode;
}

export const Paragraph = ({ children }: ParagraphProps) => {
  return <StyledText>{children}</StyledText>;
};
