import styled from "@emotion/styled";
import { HTMLAttributes, ReactNode } from "react";

const StyledText = styled.p`
  font-size: 18px;
  font-weight: normal;
  line-height: 24px;
  margin-top: 5px;
  margin-bottom: 3px;
  padding: 0;
  color: ${({ theme }) => theme.colors.content.primary};
`;

export interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export const Paragraph = ({ children, ...props }: ParagraphProps) => {
  return <StyledText {...props}>{children}</StyledText>;
};
