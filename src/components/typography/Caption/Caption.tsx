import styled from "@emotion/styled";
import * as React from "react";
import { HTMLAttributes, ReactNode } from "react";

const StyledText = styled.small`
  font-size: 14px;
  font-weight: normal;
  line-height: 16px;
  margin-top: 3px;
  margin-bottom: 5px;
  padding: 0;
  color: ${({ theme }) => theme.colors.content.primary};
`;

export interface CaptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export const Caption = ({ children, ...props }: CaptionProps) => {
  return (
    <p>
      <StyledText {...props}>{children}</StyledText>
    </p>
  );
};
