import styled from "@emotion/styled"
import * as React from "react"
import { forwardRef, HTMLAttributes, ReactNode } from "react"

const StyledText = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: bold;
  line-height: 32px;
  margin-top: 7px;
  margin-bottom: 1px;
  padding: 0;
  color: ${({ theme }) => theme.colors.content.primary};
`

export interface Title3Props extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small" | "span"
  children: ReactNode
}

export const Title3 = forwardRef<HTMLHeadingElement, Title3Props>(
  ({ children, ...props }, ref) => {
    return (
      <StyledText {...props} ref={ref}>
        {children}
      </StyledText>
    )
  },
)
