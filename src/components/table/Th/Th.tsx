import styled from "@emotion/styled"
import { ElementType, forwardRef, ReactNode, ThHTMLAttributes } from "react"
import { ContentColor, Font } from "../../../lib/theme/types"

interface ThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Effective element used. */
  as?: ElementType

  /** Content of the table header. */
  children?: ReactNode

  /** Color used in the table header. Default is `primary`. */
  color?: ContentColor

  /** Font used in the table header. Default is `body`. */
  font?: Font

  /** Indicates what cells the header element relates to. */
  scope: "col" | "row"
}

export const Th = forwardRef<HTMLTableCellElement, ThProps>(
  ({ children, color = "primary", font = "body", ...props }, ref) => {
    return (
      <StyledTh color={color} font={font} {...props} ref={ref}>
        {children}
      </StyledTh>
    )
  },
)

const StyledTh = styled.th<{ color: ContentColor; font: Font }>`
  color: ${({ color, theme }) => theme.colors.content[color]};
  font-family: ${({ font, theme }) => theme.fonts[font]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  padding-inline: ${({ theme }) => 2 * theme.spacer}px;
  block-size: ${({ theme }) => 10 * theme.spacer}px;
  text-align: start;
`
