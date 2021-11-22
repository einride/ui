import styled from "@emotion/styled"
import * as React from "react"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"
import { ContentColor } from "../../../lib/theme/types"

export interface Title2Props extends HTMLAttributes<HTMLHeadingElement> {
  as?: ElementType
  children: ReactNode
  color?: ContentColor
}

export const Title2 = forwardRef<HTMLHeadingElement, Title2Props>(
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

const StyledText = styled.h2<StyledTextProps>`
  color: ${({ color, theme }) => theme.colors.content[color]};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: calc(8 / 7);
  margin-top: 6px;
  margin-bottom: 2px;
`
