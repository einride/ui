import styled from "@emotion/styled"
import * as React from "react"
import { forwardRef, HTMLAttributes, ReactNode } from "react"

const StyledText = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: bold;
  line-height: 48px;
  margin-top: 1px;
  margin-bottom: 7px;
  padding: 0;
  color: ${({ theme }) => theme.colors.content.primary};
`

export interface Title1Props extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small" | "span"
  children: ReactNode
}

export const Title1 = forwardRef<HTMLHeadingElement, Title1Props>(
  ({ children, ...props }, ref) => {
    return (
      <StyledText {...props} ref={ref}>
        {children}
      </StyledText>
    )
  },
)
