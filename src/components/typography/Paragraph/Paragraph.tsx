import styled from "@emotion/styled";
import { ReactNode } from "react";

const StyledText = styled.p`
  font-size: 18px;
  font-weight: normal;
  line-height: 24px;
  padding-top: 5px;
  padding-bottom: 3px;
`;

export interface ParagraphProps {
  children: ReactNode;
}

export const Paragraph = ({ children }: ParagraphProps) => {
  return <StyledText>{children}</StyledText>;
};
