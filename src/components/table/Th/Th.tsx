import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes, ReactNode } from "react"

interface ThProps extends HTMLAttributes<HTMLTableCellElement> {
  children: ReactNode
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
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: calc(4 / 3);
  padding-top: ${({ theme }) => 4 * theme.spacer - 3}px;
  padding-right: ${({ theme }) => 2 * theme.spacer}px;
  padding-bottom: ${({ theme }) => 3 * theme.spacer + 3}px;
  padding-left: ${({ theme }) => 2 * theme.spacer}px;
  text-align: left;
`
