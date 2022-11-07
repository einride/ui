import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, ElementType, forwardRef, ReactNode } from "react"

interface VisuallyHiddenProps extends ComponentPropsWithoutRef<"span"> {
  /** Effective element used. Default is `span`. */
  as?: ElementType

  /** Visually hidden content. */
  children: ReactNode
}

export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ children, ...props }, ref) => {
    return (
      <Wrapper {...props} ref={ref}>
        {children}
      </Wrapper>
    )
  },
)

const Wrapper = styled.span`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  block-size: 1px;
  inline-size: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
`
