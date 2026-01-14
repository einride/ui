import styled from "@emotion/styled"
import { ComponentPropsWithoutRef } from "react"
import { getColor, getFont } from "../../../../lib/theme/prop-system"
import { Color, FontFamily, TextAlign } from "../../../../lib/theme/props"

interface ThProps extends Omit<ComponentPropsWithoutRef<"th">, "color"> {
  /** Text color set on the table header. */
  color?: Color

  /** Font set on the table header. */
  font?: FontFamily

  /** Indicates what cells the table header element relates to. */
  scope: "col" | "row"

  /** `text-align` CSS property. Set to `end` to end-align content in table header. Default is `start`. */
  textAlign?: TextAlign

  ref?: React.Ref<HTMLTableCellElement> | undefined
}

export const Th = ({
  ref,
  children,
  color,
  textAlign = "start",
  ...props
}: ThProps): React.JSX.Element => {
  return (
    <StyledTh textAlign={textAlign} textColor={color} {...props} ref={ref}>
      {children}
    </StyledTh>
  )
}

interface StyledThProps {
  font?: FontFamily
  textAlign: TextAlign | undefined
  textColor: Color | undefined
}

const StyledTh = styled.th<StyledThProps>`
  color: ${({ textColor, theme }) => textColor && getColor(textColor, theme)};
  font-family: ${({ font, theme }) => font && getFont(font, theme)};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  padding-inline: ${({ theme }) => 2 * theme.spacingBase}rem;
  block-size: ${({ theme }) => 10 * theme.spacingBase}rem;
  text-align: ${({ textAlign }) => textAlign};
`
