import styled from "@emotion/styled";
import * as React from "react";
import { HTMLAttributes, ReactNode } from "react";

const StyledText = styled.h1`
  font-size: 80px;
  font-weight: bold;
  line-height: 80px;
  margin-top: 2px;
  margin-bottom: 14px;
  padding: 0;
  color: ${({ theme }) => theme.colors.content.primary};
`;

export interface MegaTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2";
  children: ReactNode;
}

export const MegaTitle = ({
  as = "h1",
  children,
  ...props
}: MegaTitleProps) => {
  return (
    <StyledText as={as} {...props}>
      {children}
    </StyledText>
  );
};
