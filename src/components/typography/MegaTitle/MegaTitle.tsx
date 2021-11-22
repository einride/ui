import styled from "@emotion/styled"
import * as React from "react"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"
import { ContentColor } from "../../../lib/theme/types"

export interface MegaTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: ElementType
  children: ReactNode
  color?: ContentColor
}

export const MegaTitle = forwardRef<HTMLHeadingElement, MegaTitleProps>(
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
  font-size: ${({ theme }) => theme.fontSizes["8xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1;
  margin-top: 2px;
  margin-bottom: 14px;
`
