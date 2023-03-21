import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import { getColor, getFont } from "../../../lib/theme/prop-system"
import { Color, FontFamily, TextAlign } from "../../../lib/theme/props"

interface TdProps extends Omit<ComponentPropsWithoutRef<"td">, "color"> {
  /** Text color set on the table cell. */
  color?: Color

  /** Font set on the table data cell. */
  font?: FontFamily

  /** `text-align` CSS property. Set to `end` to end-align content in table cell. */
  textAlign?: TextAlign
}

export const Td = forwardRef<HTMLTableCellElement, TdProps>(
  ({ children, color, ...props }, ref) => {
    return (
      <StyledTd textColor={color} {...props} ref={ref}>
        {children}
      </StyledTd>
    )
  },
)

interface StyledTdProps {
  font?: FontFamily
  textAlign?: TextAlign
  textColor: Color | undefined
}

const StyledTd = styled.td<StyledTdProps>`
  color: ${({ textColor, theme }) => textColor && getColor(textColor, theme)};
  font-family: ${({ font, theme }) => font && getFont(font, theme)};
  line-height: calc(4 / 3);
  padding-inline: ${({ theme }) => 2 * theme.spacingBase}rem;
  block-size: ${({ theme }) => 10 * theme.spacingBase}rem;
  text-align: ${({ textAlign }) => textAlign};
`
