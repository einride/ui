import styled from "@emotion/styled"
import { ComponentPropsWithoutRef } from "react"
import { getColor, getFont } from "../../../../lib/theme/prop-system"
import { Color, FontFamily } from "../../../../lib/theme/props"

interface TbodyProps extends Omit<ComponentPropsWithoutRef<"tbody">, "color"> {
  /** Text color set on the table body. */
  color?: Color

  /** Font set on the table body. */
  font?: FontFamily

  ref?: React.Ref<HTMLTableSectionElement> | undefined
}

export const Tbody = ({ ref, children, color, ...props }: TbodyProps): React.JSX.Element => {
  return (
    <StyledTbody textColor={color} {...props} ref={ref}>
      {children}
    </StyledTbody>
  )
}

interface StyledTbodyProps {
  font?: FontFamily
  textColor: Color | undefined
}

const StyledTbody = styled.tbody<StyledTbodyProps>`
  color: ${({ textColor, theme }) => textColor && getColor(textColor, theme)};
  font-family: ${({ font, theme }) => font && getFont(font, theme)};
`
