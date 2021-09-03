import styled from "@emotion/styled";
import * as React from "react";
import { forwardRef, HTMLAttributes, ReactNode } from "react";

const StyledText = styled.h3`
  font-size: 24px;
  font-weight: normal;
  line-height: 32px;
  margin-top: 7px;
  margin-bottom: 1px;
  padding: 0;
  color: ${({ theme }) => theme.colors.content.primary};
`;

export interface Title3Props extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3" | "h4";
  children: ReactNode;
}

export const Title3 = forwardRef<HTMLHeadingElement, Title3Props>(
  ({ as = "h3", children, ...props }, ref) => {
    return (
      <StyledText as={as} {...props} ref={ref}>
        {children}
      </StyledText>
    );
  }
);
