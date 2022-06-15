import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"
import { ContentColor, Font } from "../../../lib/theme/types"

export interface CaptionProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: ElementType
  children: ReactNode
  color?: ContentColor
  font?: Font
}

export const Caption = forwardRef<HTMLParagraphElement, CaptionProps>(
  ({ children, color = "primary", font = "body", ...props }, ref) => {
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

const StyledText = styled.p<StyledTextProps>`
  color: ${({ color, theme }) => theme.colors.content[color]};
  font-family: ${({ font, theme }) => theme.fonts[font]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(8 / 7);
  margin-top: 3px;
  margin-bottom: 5px;
`
