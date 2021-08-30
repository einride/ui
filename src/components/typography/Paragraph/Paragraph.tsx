import styled from "@emotion/styled";
import * as React from "react";
import { HTMLAttributes, ReactNode } from "react";

const StyledText = styled.p<ParagraphProps>`
  font-size: 18px;
  font-weight: normal;
  line-height: 24px;
  margin-top: 5px;
  margin-bottom: 3px;
  padding: 0;
  color: ${({ theme }) => theme.colors.content.primary};
  color: ${({ color, theme }) =>
    color === "secondary"
      ? theme.colors.content.secondary
      : theme.colors.content.primary};
`;

export interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  color?: "primary" | "secondary";
}

export const Paragraph = ({
  children,
  color = "primary",
  ...props
}: ParagraphProps) => {
  return (
    <StyledText color={color} {...props}>
      {children}
    </StyledText>
  );
};
