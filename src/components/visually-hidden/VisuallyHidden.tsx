import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, ReactNode } from "react"

export interface VisuallyHiddenProps extends ComponentPropsWithoutRef<"span"> {
  /** Visually hidden content. */
  children: ReactNode

  ref?: React.Ref<HTMLSpanElement> | undefined
}

export const VisuallyHidden = ({
  ref,
  children,
  ...props
}: VisuallyHiddenProps): React.JSX.Element => {
  return (
    <Wrapper {...props} ref={ref}>
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.span`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  block-size: 1px;
  inline-size: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
`
