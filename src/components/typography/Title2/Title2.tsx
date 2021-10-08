import styled from "@emotion/styled"
import * as React from "react"
import { forwardRef, HTMLAttributes, ReactNode } from "react"

const StyledText = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: bold;
  line-height: 32px;
  margin-top: 6px;
  margin-bottom: 2px;
  padding: 0;
  color: ${({ theme }) => theme.colors.content.primary};
`

export interface Title2Props extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
}

export const Title2 = forwardRef<HTMLHeadingElement, Title2Props>(
  ({ children, ...props }, ref) => {
    return (
      <StyledText {...props} ref={ref}>
        {children}
      </StyledText>
    )
  },
)
