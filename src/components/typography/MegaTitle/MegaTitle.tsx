import isPropValid from "@emotion/is-prop-valid"
import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"
import { ContentColor, Font } from "../../../lib/theme/types"

export interface MegaTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Effective element used. */
  as?: ElementType

  /** Mega title content. */
  children: ReactNode

  /** Text color of the mega title. Default is `primary`. */
  color?: ContentColor

  /** Font styling.  */
  font?: Font
}

export const MegaTitle = forwardRef<HTMLHeadingElement, MegaTitleProps>(
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

const StyledText = styled("h1", {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "color", // avoid passing `color` attribute to HTML element
})<StyledTextProps>`
  color: ${({ color, theme }) => theme.colors.content[color]};
  font-family: ${({ font, theme }) => theme.fonts[font]};
  font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1;
  margin-top: 2px;
  margin-bottom: 14px;
`
