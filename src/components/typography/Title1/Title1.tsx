import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"
import { ContentColor, Font } from "../../../lib/theme/types"

export interface Title1Props extends HTMLAttributes<HTMLHeadingElement> {
  as?: ElementType
  children: ReactNode
  color?: ContentColor
  font?: Font
}

export const Title1 = forwardRef<HTMLHeadingElement, Title1Props>(
  ({ children, color = "primary", font = "heading", ...props }, ref) => {
    return (
      <StyledText color={color} font={font} {...props} ref={ref}>
        {children}
      </StyledText>
    )
  },
)

interface StyledTextProps {
  color: ContentColor
  font: Font
}

const StyledText = styled.h1<StyledTextProps>`
  color: ${({ color, theme }) => theme.colors.content[color]};
  font-family: ${({ font, theme }) => theme.fonts[font]};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: calc(6 / 5);
  margin-top: 1px;
  margin-bottom: 7px;
`
