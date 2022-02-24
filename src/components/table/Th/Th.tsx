import styled from "@emotion/styled"
import { ElementType, forwardRef, ReactNode, ThHTMLAttributes } from "react"

interface ThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  as?: ElementType
  children: ReactNode
  /**
   * Defines the cells that the header element relates to.
   */
  scope: "col" | "row"
}

export const Th = forwardRef<HTMLTableCellElement, ThProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledTh {...props} ref={ref}>
        {children}
      </StyledTh>
    )
  },
)

const StyledTh = styled.th`
  display: table-cell;
  font-weight: ${({ theme }) => theme.fontWeights.book};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: calc(4 / 3);
  padding-top: ${({ theme }) => 4 * theme.spacer - 3}px;
  padding-right: ${({ theme }) => 2 * theme.spacer}px;
  padding-bottom: ${({ theme }) => 3 * theme.spacer + 3}px;
  padding-left: ${({ theme }) => 2 * theme.spacer}px;
  text-align: left;
`
