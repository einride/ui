import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"
import { ContentColor, Font } from "../../../lib/theme/types"

interface TdProps extends HTMLAttributes<HTMLTableCellElement> {
  /** Effective element used. */
  as?: ElementType

  /** Content of the table data cell. */
  children?: ReactNode

  /** Color used in the table data cell. Default is `primary`. */
  color?: ContentColor

  /** Font used in the table data cell. Default is `body`. */
  font?: Font
}

export const Td = forwardRef<HTMLTableCellElement, TdProps>(
  ({ children, color = "primary", font = "body", ...props }, ref) => {
    return (
      <StyledTd color={color} font={font} {...props} ref={ref}>
        {children}
      </StyledTd>
    )
  },
)

const StyledTd = styled.td<{ color: ContentColor; font: Font }>`
  color: ${({ color, theme }) => theme.colors.content[color]};
  font-family: ${({ font, theme }) => theme.fonts[font]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  padding-right: ${({ theme }) => 2 * theme.spacer}px;
  padding-left: ${({ theme }) => 2 * theme.spacer}px;
  height: ${({ theme }) => 10 * theme.spacer}px;
`
