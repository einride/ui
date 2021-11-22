import styled from "@emotion/styled"
import * as React from "react"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"
import { ContentColor } from "../../../lib/theme/types"

export interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: ElementType
  children: ReactNode
  color?: ContentColor
}

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
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

const StyledText = styled.p<StyledTextProps>`
  color: ${({ color, theme }) => theme.colors.content[color]};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  margin-top: 5px;
  margin-bottom: 3px;
`
