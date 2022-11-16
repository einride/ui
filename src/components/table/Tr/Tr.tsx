import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes, ReactNode } from "react"
import { getColor } from "../../../lib/theme/prop-system"
import { As, Color } from "../../../lib/theme/props"

interface TrProps extends Omit<HTMLAttributes<HTMLTableRowElement>, "color"> {
  /** Effective element used. */
  as?: As

  /** Content of the table row. */
  children: ReactNode

  /** Color used in the table header. */
  color?: Color
}

export const Tr = forwardRef<HTMLTableRowElement, TrProps>(({ children, color, ...props }, ref) => {
  return (
    <StyledTr textColor={color} {...props} ref={ref}>
      {children}
    </StyledTr>
  )
})

interface StyledTrProps {
  textColor: Color | undefined
}

const StyledTr = styled.tr<StyledTrProps>`
  color: ${({ textColor, theme }) => textColor && getColor(textColor, theme)};
  border-block-start: 1px solid ${({ theme }) => theme.colors.border.primary};
`
