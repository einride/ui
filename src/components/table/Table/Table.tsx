import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import { getColor, getFont } from "../../../lib/theme/prop-system"
import { Color, FontFamily } from "../../../lib/theme/props"

interface TableProps extends Omit<ComponentPropsWithoutRef<"table">, "color"> {
  /** Text color set on the table. */
  color?: Color

  /** Font set on the table. */
  font?: FontFamily
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ children, color, ...props }, ref) => {
    return (
      <StyledTable textColor={color} {...props} ref={ref}>
        {children}
      </StyledTable>
    )
  },
)

interface StyledTableProps {
  font?: FontFamily
  textColor: Color | undefined
}

const StyledTable = styled.table<StyledTableProps>`
  color: ${({ textColor, theme }) => textColor && getColor(textColor, theme)};
  font-family: ${({ font, theme }) => font && getFont(font, theme)};
  inline-size: 100%;
`
