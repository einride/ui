import styled from "@emotion/styled"
import * as React from "react"
import { forwardRef, HTMLAttributes, ReactNode } from "react"

const StyledText = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  font-weight: bold;
  line-height: 80px;
  margin-top: 2px;
  margin-bottom: 14px;
  padding: 0;
  color: ${({ theme }) => theme.colors.content.primary};
`

export interface MegaTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small" | "span"
  children: ReactNode
}

export const MegaTitle = forwardRef<HTMLHeadingElement, MegaTitleProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledText {...props} ref={ref}>
        {children}
      </StyledText>
    )
  },
)
