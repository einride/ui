import styled from "@emotion/styled"
import { forwardRef, ReactNode, ThHTMLAttributes } from "react"
import { getColor, getFont } from "../../../lib/theme/prop-system"
import { As, Color, FontFamily } from "../../../lib/theme/props"

interface ThProps extends Omit<ThHTMLAttributes<HTMLTableCellElement>, "color"> {
  /** Effective element used. */
  as?: As

  /** Content of the table header. */
  children?: ReactNode

  /** Color used in the table header. */
  color?: Color

  /** Font used in the table header. */
  font?: FontFamily

  /** Indicates what cells the header element relates to. */
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
  padding-inline: ${({ theme }) => 2 * theme.spacer}px;
  block-size: ${({ theme }) => 10 * theme.spacer}px;
  text-align: start;
`
