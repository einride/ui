import styled from "@emotion/styled"
import * as React from "react"
import { forwardRef, HTMLAttributes, ReactNode } from "react"

const StyledText = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: normal;
  line-height: 32px;
  margin-top: 6px;
  margin-bottom: 2px;
  padding: 0;
  color: ${({ theme }) => theme.colors.content.primary};
`

export interface Title2Props extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h2" | "h3"
  children: ReactNode
}

export const Title2 = forwardRef<HTMLHeadingElement, Title2Props>(
  ({ as = "h2", children, ...props }, ref) => {
    return (
      <StyledText as={as} {...props} ref={ref}>
        {children}
      </StyledText>
    )
  },
)
