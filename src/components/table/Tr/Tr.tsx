import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import { getColor, getFont } from "../../../lib/theme/prop-system"
import { Color, FontFamily } from "../../../lib/theme/props"

interface TrProps extends Omit<ComponentPropsWithoutRef<"tr">, "color"> {
  /** Text color set on the table row. */
  color?: Color

  /** Font set on the table row. */
  font?: FontFamily
}

export const Tr = forwardRef<HTMLTableRowElement, TrProps>(({ children, color, ...props }, ref) => {
  return (
    <StyledTr textColor={color} {...props} ref={ref}>
      {children}
    </StyledTr>
  )
})

interface StyledTrProps {
  font?: FontFamily
  textColor: Color | undefined
}

const StyledTr = styled.tr<StyledTrProps>`
  color: ${({ textColor, theme }) => textColor && getColor(textColor, theme)};
  font-family: ${({ font, theme }) => font && getFont(font, theme)};
  border-block-start: ${({ theme }) => 0.125 * theme.spacingBase}rem solid
    ${({ theme }) => theme.colors.border.primary};
`
