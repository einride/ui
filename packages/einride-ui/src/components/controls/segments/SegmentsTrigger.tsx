import styled from "@emotion/styled"
import * as Tabs from "@radix-ui/react-tabs"
import { ReactNode, forwardRef } from "react"

export interface SegmentsTriggerProps {
  /** Content of the segment trigger. */
  children: ReactNode

  /** A unique value that associates the trigger with a content. */
  value: string
}

/** Radio button. */
export const SegmentsTrigger = forwardRef<HTMLButtonElement, SegmentsTriggerProps>(
  ({ children, value }, ref) => {
    return (
      <Trigger value={value} ref={ref}>
        {children}
      </Trigger>
    )
  },
)

const Trigger = styled(Tabs.Trigger)`
  padding-inline: ${({ theme }) => 2 * theme.spacingBase}rem;
  padding-block: ${({ theme }) => 1.5 * theme.spacingBase}rem;
  border-radius: ${({ theme }) => theme.borderRadii.full};
  outline: none;

  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiaryElevated};
  }

  &[aria-selected="true"] {
    background: ${({ theme }) => theme.colors.background.positive};
    color: ${({ theme }) => theme.colors.content.primaryInverted};
  }

  &:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 0.0625rem ${({ theme }) => theme.colors.border.selected};
  }
`
