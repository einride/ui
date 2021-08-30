import styled from "@emotion/styled";
import * as React from "react";
import { HTMLAttributes, ReactNode } from "react";

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

export const Title3 = ({ as = "h3", children, ...props }: Title3Props) => {
  return (
    <StyledText as={as} {...props}>
      {children}
    </StyledText>
  );
};
