import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"

interface TbodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  as?: ElementType
  children: ReactNode
}

export const Tbody = forwardRef<HTMLTableSectionElement, TbodyProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledTbody {...props} ref={ref}>
        {children}
      </StyledTbody>
    )
  },
)

const StyledTbody = styled.tbody``
