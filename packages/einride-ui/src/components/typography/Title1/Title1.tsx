import isPropValid from "@emotion/is-prop-valid"
import styled from "@emotion/styled"
import { ElementType, HTMLAttributes, ReactNode, forwardRef } from "react"
import { ContentColor, Font } from "../../../lib/theme/types"

export interface Title1Props extends HTMLAttributes<HTMLHeadingElement> {
  /** Rendered element. */
  as?: ElementType

  /** Title content. */
  children: ReactNode

  /** Text color of the title. */
  color?: ContentColor

  /** Font styling. */
  font?: Font
}

export const Title1 = forwardRef<HTMLHeadingElement, Title1Props>(
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

const StyledText = styled("h1", {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "color", // avoid passing `color` attribute to HTML element
})<StyledTextProps>`
  color: ${({ color, theme }) => color && theme.colors.content[color]};
  font-family: ${({ font, theme }) => font && theme.fonts[font]};
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: calc(6 / 5);
  margin-block-start: 1px;
  margin-block-end: 7px;
`
