import styled from "@emotion/styled"
import { ElementType, forwardRef, ReactNode, ThHTMLAttributes } from "react"
import { ContentColor, Font } from "../../../lib/theme/types"

interface ThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  as?: ElementType
  children: ReactNode
  /**
   * Default: "primary"
   */
  color?: ContentColor
  /**
   * Default: "body"
   */
  font?: Font
  /**
   * Defines the cells that the header element relates to.
   */
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
  padding-top: ${({ theme }) => 4 * theme.spacer - 3}px;
  padding-right: ${({ theme }) => 2 * theme.spacer}px;
  padding-bottom: ${({ theme }) => 3 * theme.spacer + 3}px;
  padding-left: ${({ theme }) => 2 * theme.spacer}px;
  text-align: left;
`
