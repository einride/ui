import styled from "@emotion/styled";
import * as React from "react";
import { forwardRef, HTMLAttributes, ReactNode } from "react";

const StyledText = styled.h1`
  font-size: 40px;
  font-weight: bold;
  line-height: 48px;
  margin-top: 1px;
  margin-bottom: 7px;
  padding: 0;
  color: ${({ theme }) => theme.colors.content.primary};
`;

export interface Title1Props extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2";
  children: ReactNode;
}

export const Title1 = forwardRef<HTMLHeadingElement, Title1Props>(
  ({ as = "h1", children, ...props }, ref) => {
    return (
      <StyledText as={as} {...props} ref={ref}>
        {children}
      </StyledText>
    );
  }
);
