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
  border-block-start: 1px solid ${({ theme }) => theme.colors.border.primary};
`
