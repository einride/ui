import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"

interface TbodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  /** Effective element used. */
  as?: ElementType

  /** Content of the table body. */
  children?: ReactNode
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
