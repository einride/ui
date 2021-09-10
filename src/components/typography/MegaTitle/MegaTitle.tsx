import styled from "@emotion/styled"
import * as React from "react"
import { forwardRef, HTMLAttributes, ReactNode } from "react"

const StyledText = styled.h1`
  font-size: 80px;
  font-weight: bold;
  line-height: 80px;
  margin-top: 2px;
  margin-bottom: 14px;
  padding: 0;
  color: ${({ theme }) => theme.colors.content.primary};
`

export interface MegaTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2"
  children: ReactNode
}

export const MegaTitle = forwardRef<HTMLHeadingElement, MegaTitleProps>(
  ({ as = "h1", children, ...props }, ref) => {
    return (
      <StyledText as={as} {...props} ref={ref}>
        {children}
      </StyledText>
    )
  },
)
