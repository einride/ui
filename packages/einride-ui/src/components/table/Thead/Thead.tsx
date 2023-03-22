import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import { getColor, getFont } from "@einride/core"
import { Color, FontFamily } from "@einride/core"

export interface TheadProps extends Omit<ComponentPropsWithoutRef<"thead">, "color"> {
  /** Text color set on the table head. */
  color?: Color

  /** Font set on the table head. */
  font?: FontFamily
}

export const Thead = forwardRef<HTMLTableSectionElement, TheadProps>(
  ({ children, color, ...props }, ref) => {
    return (
      <StyledThead textColor={color} {...props} ref={ref}>
        {children}
      </StyledThead>
    )
  },
)

interface StyledTheadProps {
  font?: FontFamily
  textColor: Color | undefined
}

const StyledThead = styled.thead<StyledTheadProps>`
  color: ${({ textColor, theme }) => textColor && getColor(textColor, theme)};
  font-family: ${({ font, theme }) => font && getFont(font, theme)};

  tr {
    border-block-start: none;
  }
`
