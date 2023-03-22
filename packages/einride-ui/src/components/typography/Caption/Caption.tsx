import isPropValid from "@emotion/is-prop-valid"
import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, ElementType, forwardRef, ReactNode } from "react"
import { ContentColor, Font } from "@einride/core"

export interface CaptionProps extends Omit<ComponentPropsWithoutRef<"p">, "color"> {
  /** Effective element used. */
  as?: ElementType

  /** Caption content. */
  children: ReactNode

  /** Text color of the caption. */
  color?: ContentColor

  /** Font styling. */
  font?: Font
}

export const Caption = forwardRef<HTMLParagraphElement, CaptionProps>(
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
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(8 / 7);
  margin-block-start: 3px;
  margin-block-end: 5px;
`
