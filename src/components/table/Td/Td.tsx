import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"

interface TdProps extends HTMLAttributes<HTMLTableCellElement> {
  as?: ElementType
  children: ReactNode
}

export const Td = forwardRef<HTMLTableCellElement, TdProps>(({ children, ...props }, ref) => {
  return (
    <StyledTd {...props} ref={ref}>
      {children}
    </StyledTd>
  )
})

const StyledTd = styled.td`
  display: table-cell;
  font-weight: ${({ theme }) => theme.fontWeights.book};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: calc(4 / 3);
  padding-top: ${({ theme }) => 4 * theme.spacer - 3}px;
  padding-right: ${({ theme }) => 2 * theme.spacer}px;
  padding-bottom: ${({ theme }) => 3 * theme.spacer + 3}px;
  padding-left: ${({ theme }) => 2 * theme.spacer}px;
`
