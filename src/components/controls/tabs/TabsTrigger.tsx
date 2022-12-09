import styled from "@emotion/styled"
import * as Tabs from "@radix-ui/react-tabs"
import { ReactNode } from "react"

interface TabsTriggerProps {
  /** Tabs trigger content. */
  children: ReactNode

  /** When true, prevents the user from interacting with the tab. */
  disabled?: boolean

  /** A unique value that associates the trigger with a content. */
  value: string
}

export const TabsTrigger = ({ children, ...props }: TabsTriggerProps): JSX.Element => {
  return <StyledTabsTrigger {...props}>{children}</StyledTabsTrigger>
}

const StyledTabsTrigger = styled(Tabs.Trigger)`
  color: ${({ theme }) => theme.colors.content.secondary};
  padding-block-start: ${({ theme }) => theme.spacer + 1}px;
  padding-block-end: ${({ theme }) => 2 * theme.spacer - 1}px;
  box-shadow: inset 0 -1px 0 ${({ theme }) => theme.colors.border.primary};
  margin-block-end: ${({ theme }) => 3 * theme.spacer}px;

  &[aria-selected="true"] {
    color: ${({ theme }) => theme.colors.content.primary};
    box-shadow: inset 0 -1px 0 ${({ theme }) => theme.colors.border.selected};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.content.primary};
  }

  &:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border.selected};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.content.tertiary};
    box-shadow: inset 0 -1px 0 ${({ theme }) => theme.colors.border.primary};
  }
`
