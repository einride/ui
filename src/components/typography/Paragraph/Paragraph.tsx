import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"
import { ContentColor, Font } from "../../../lib/theme/types"

export interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: ElementType
  children: ReactNode
  color?: ContentColor
  font?: Font
}

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
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
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  margin-top: 5px;
  margin-bottom: 3px;
`
