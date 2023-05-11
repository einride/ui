import isPropValid from "@emotion/is-prop-valid"
import styled from "@emotion/styled"
import { ElementType, HTMLAttributes, ReactNode, forwardRef } from "react"
import { ContentColor, Font } from "../../../lib/theme/types"

export interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Rendered element. */
  as?: ElementType

  /** Paragraph content. */
  children: ReactNode

  /** Text color of the paragraph. */
  color?: ContentColor

  /** Font styling. */
  font?: Font
}

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ children, color, font, ...props }, ref) => {
    return (
      <StyledText color={color} font={font} {...props} ref={ref}>
        {children}
      </StyledText>
    )
  },
)

interface StyledTextProps {
  color: ContentColor | undefined
  font: Font | undefined
}

const StyledText = styled("p", {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "color", // avoid passing `color` attribute to HTML element
})<StyledTextProps>`
  color: ${({ color, theme }) => color && theme.colors.content[color]};
  font-family: ${({ font, theme }) => font && theme.fonts[font]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  margin-block-start: 5px;
  margin-block-end: 3px;
`
