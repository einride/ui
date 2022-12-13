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
  padding-block-start: ${({ theme }) => 1.625 * theme.spacingBase}rem;
  padding-block-end: ${({ theme }) => 2.375 * theme.spacingBase}rem;
  padding-inline: ${({ theme }) => 2 * theme.spacingBase}rem;
  box-shadow: inset 0 -0.125rem 0 ${({ theme }) => theme.colors.border.primary};
  line-height: calc(4 / 3);

  &[aria-selected="true"] {
    color: ${({ theme }) => theme.colors.content.primary};
    box-shadow: inset 0 -0.125rem 0 ${({ theme }) => theme.colors.border.selected};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.content.primary};
  }

  &:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 0.125rem ${({ theme }) => theme.colors.border.selected};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.content.tertiary};
    box-shadow: inset 0 -0.125rem 0 ${({ theme }) => theme.colors.border.primary};
  }
`
