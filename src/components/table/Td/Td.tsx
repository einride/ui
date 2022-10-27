import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"
import { TextAlign } from "../../../lib/theme/props"
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

  /** `text-align` CSS property. Set to `end` to end-align content in table cell.  */
  textAlign?: TextAlign
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

interface StyledTdProps {
  color: ContentColor
  font: Font
  textAlign?: TextAlign
}

const StyledTd = styled.td<StyledTdProps>`
  color: ${({ color, theme }) => theme.colors.content[color]};
  font-family: ${({ font, theme }) => theme.fonts[font]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  padding-inline: ${({ theme }) => 2 * theme.spacer}px;
  block-size: ${({ theme }) => 10 * theme.spacer}px;
  text-align: ${({ textAlign }) => textAlign};
`
