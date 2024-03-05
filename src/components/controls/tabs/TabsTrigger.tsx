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

export const TabsTrigger = ({ children, ...props }: TabsTriggerProps): React.JSX.Element => {
  return <StyledTabsTrigger {...props}>{children}</StyledTabsTrigger>
}

const StyledTabsTrigger = styled(Tabs.Trigger)`
  color: ${({ theme }) => theme.colors.content.secondary};
  padding-block-start: ${({ theme }) => 1.625 * theme.spacingBase}rem;
  padding-block-end: ${({ theme }) => 2.375 * theme.spacingBase}rem;
  padding-inline: ${({ theme }) => 2 * theme.spacingBase}rem;
  border-block-end: 0.0625rem solid ${({ theme }) => theme.colors.border.primary};
  line-height: calc(4 / 3);

  &[aria-selected="true"] {
    color: ${({ theme }) => theme.colors.content.primary};
    border-block-end: 0.0625rem solid ${({ theme }) => theme.colors.border.selected};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.content.primary};
  }

  &:focus-visible {
    outline: none;
    border: 0.0625rem solid ${({ theme }) => theme.colors.border.selected};
    // The added border takes up extra space. Add negative margins to keep the tab item in it's original size.
    margin-inline: -0.0625rem;
    margin-block-start: -0.0625rem;
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.content.tertiary};
    border-block-end: 0.0625rem solid ${({ theme }) => theme.colors.border.primary};
  }
`
