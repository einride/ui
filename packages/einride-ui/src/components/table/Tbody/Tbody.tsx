import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import { getColor, getFont } from "@einride/core"
import { Color, FontFamily } from "@einride/core"

interface TbodyProps extends Omit<ComponentPropsWithoutRef<"tbody">, "color"> {
  /** Text color set on the table body. */
  color?: Color

  /** Font set on the table body. */
  font?: FontFamily
}

export const Tbody = forwardRef<HTMLTableSectionElement, TbodyProps>(
  ({ children, color, ...props }, ref) => {
    return (
      <StyledTbody textColor={color} {...props} ref={ref}>
        {children}
      </StyledTbody>
    )
  },
)

interface StyledTbodyProps {
  font?: FontFamily
  textColor: Color | undefined
}

const StyledTbody = styled.tbody<StyledTbodyProps>`
  color: ${({ textColor, theme }) => textColor && getColor(textColor, theme)};
  font-family: ${({ font, theme }) => font && getFont(font, theme)};
`
