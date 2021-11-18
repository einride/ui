import styled from "@emotion/styled"
import * as React from "react"
import { forwardRef, HTMLAttributes, ReactNode } from "react"

const StyledText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: normal;
  line-height: 16px;
  margin-top: 3px;
  margin-bottom: 5px;
  padding: 0;
  color: ${({ theme }) => theme.colors.content.primary};
`

export interface CaptionProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small" | "span"
  children: ReactNode
}

export const Caption = forwardRef<HTMLParagraphElement, CaptionProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledText {...props} ref={ref}>
        {children}
      </StyledText>
    )
  },
)
