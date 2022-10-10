import isPropValid from "@emotion/is-prop-valid"
import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"
import { ContentColor, Font } from "../../../lib/theme/types"

export interface Title3Props extends HTMLAttributes<HTMLHeadingElement> {
  /** Effective element used. */
  as?: ElementType

  /** Title content. */
  children: ReactNode

  /** Text color of the title. Default is `primary`. */
  color?: ContentColor

  /** Font styling.  */
  font?: Font
}

export const Title3 = forwardRef<HTMLHeadingElement, Title3Props>(
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

const StyledText = styled("h3", {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "color", // avoid passing `color` attribute to HTML element
})<StyledTextProps>`
  color: ${({ color, theme }) => theme.colors.content[color]};
  font-family: ${({ font, theme }) => theme.fonts[font]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: calc(4 / 3);
  margin-block-start: 7px;
  margin-block-end: 1px;
`
