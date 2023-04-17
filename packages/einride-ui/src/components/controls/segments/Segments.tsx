import styled from "@emotion/styled"
import * as Tabs from "@radix-ui/react-tabs"
import { ReactNode, forwardRef } from "react"

export interface SegmentsProps {
  /** Segments content. */
  children: ReactNode

  /** Event handler called when the value changes. */
  onValueChange: (value: string) => void

  /** The controlled value of the segment to activate. Should be used in conjunction with `onValueChange`. */
  value: string
}

/** Segments used as radio buttons. */
export const Segments = forwardRef<HTMLDivElement, SegmentsProps>(
  ({ children, onValueChange, value }, ref) => {
    return (
      <Root onValueChange={onValueChange} value={value} ref={ref}>
        <Tabs.List>{children}</Tabs.List>
      </Root>
    )
  },
)

const Root = styled(Tabs.Root)`
  background: ${({ theme }) => theme.colors.background.secondaryElevated};
  border-radius: ${({ theme }) => theme.borderRadii.full};
  display: inline-block;
`
