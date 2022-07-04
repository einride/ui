import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"

interface TrProps extends HTMLAttributes<HTMLTableRowElement> {
  as?: ElementType
  children: ReactNode
}

export const Tr = forwardRef<HTMLTableRowElement, TrProps>(({ children, ...props }, ref) => {
  return (
    <StyledTr {...props} ref={ref}>
      {children}
    </StyledTr>
  )
})

const StyledTr = styled.tr`
  // box-shadow on table element is not supported in Safari
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    box-shadow: 0 -1px 0 ${({ theme }) => theme.colors.border.primary};
    // z-index to make table cell content selectable in chrome
    z-index: -1;
  }
`
