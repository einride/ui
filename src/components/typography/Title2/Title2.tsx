import isPropValid from "@emotion/is-prop-valid"
import styled from "@emotion/styled"
import { ElementType, HTMLAttributes, ReactNode } from "react"
import { ContentColor, Font } from "../../../lib/theme/types"

export interface Title2Props extends HTMLAttributes<HTMLHeadingElement> {
  /** Rendered element. */
  as?: ElementType

  /** Title content. */
  children: ReactNode

  /** Text color of the title. */
  color?: ContentColor

  /** Font styling. */
  font?: Font

  ref?: React.Ref<HTMLHeadingElement> | undefined
}

export const Title2 = ({
  ref,
  children,
  color,
  font,
  ...props
}: Title2Props): React.JSX.Element => {
  return (
    <StyledText color={color} font={font} {...props} ref={ref}>
      {children}
    </StyledText>
  )
}

interface StyledTextProps {
  color: ContentColor | undefined
  font: Font | undefined
}

const StyledText = styled("h2", {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "color", // avoid passing `color` attribute to HTML element
})<StyledTextProps>`
  color: ${({ color, theme }) => color && theme.colors.content[color]};
  font-family: ${({ font, theme }) => font && theme.fonts[font]};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: calc(8 / 7);
  margin-block-start: 6px;
  margin-block-end: 2px;
`
