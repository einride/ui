import styled from "@emotion/styled"
import * as React from "react"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"
import { ContentColor } from "../../../lib/theme/types"

export interface Title1Props extends HTMLAttributes<HTMLHeadingElement> {
  as?: ElementType
  children: ReactNode
  color?: ContentColor
}

export const Title1 = forwardRef<HTMLHeadingElement, Title1Props>(
  ({ children, color = "primary", ...props }, ref) => {
    return (
      <StyledText color={color} {...props} ref={ref}>
        {children}
      </StyledText>
    )
  },
)

interface StyledTextProps {
  color: ContentColor
}

const StyledText = styled.h1<StyledTextProps>`
  color: ${({ color, theme }) => theme.colors.content[color]};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: calc(6 / 5);
  margin-top: 1px;
  margin-bottom: 7px;
`
