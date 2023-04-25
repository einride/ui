import styled from "@emotion/styled"
import * as RadioGroup from "@radix-ui/react-radio-group"
import { ReactNode, forwardRef } from "react"

export interface SegmentsProps {
  /** Segments content. */
  children: ReactNode

  /** The value of the segment item that should be selected when initially rendered. Use when you do not need to control the state of the segments. */
  defaultValue?: string

  /** The name of the group. Submitted with its owning form as part of a name/value pair. */
  name?: string

  /** Event handler called when the value changes. */
  onValueChange?: (value: string) => void

  /** The controlled value of the selected segment. Should be used in conjunction with `onValueChange`. */
  value?: string
}

/** Segments are a tab-like alternative to radio buttons. */
export const Segments = forwardRef<HTMLDivElement, SegmentsProps>(({ children, ...props }, ref) => {
  return (
    <Root {...props} ref={ref}>
      {children}
    </Root>
  )
})

const Root = styled(RadioGroup.Root)`
  background: ${({ theme }) => theme.colors.background.secondaryElevated};
  border-radius: ${({ theme }) => theme.borderRadii.full};
  display: inline-block;
`
