import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import { getColor, getFont } from "../../../lib/theme/prop-system"
import { Color, FontFamily } from "../../../lib/theme/props"

interface ThProps extends Omit<ComponentPropsWithoutRef<"th">, "color"> {
  /** Text color set on the table header. */
  color?: Color

  /** Font set on the table header. */
  font?: FontFamily

  /** Indicates what cells the table header element relates to. */
  scope: "col" | "row"
}

export const Th = forwardRef<HTMLTableCellElement, ThProps>(
  ({ children, color, ...props }, ref) => {
    return (
      <StyledTh textColor={color} {...props} ref={ref}>
        {children}
      </StyledTh>
    )
  },
)

interface StyledThProps {
  font?: FontFamily
  textColor: Color | undefined
}

const StyledTh = styled.th<StyledThProps>`
  color: ${({ textColor, theme }) => textColor && getColor(textColor, theme)};
  font-family: ${({ font, theme }) => font && getFont(font, theme)};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  padding-inline: ${({ theme }) => 2 * theme.spacingBase}rem;
  block-size: ${({ theme }) => 10 * theme.spacingBase}rem;
  text-align: start;
`
