import styled from "@emotion/styled"
import * as Tabs from "@radix-ui/react-tabs"
import { ReactNode } from "react"

interface TabsListProps {
  /** Tabs list content. */
  children: ReactNode

  /** Determines whether tabs should take the whole space. */
  grow?: boolean
}

export const TabsList = ({ children, ...props }: TabsListProps): JSX.Element => {
  return <StyledTabsList {...props}>{children}</StyledTabsList>
}

interface StyledTabsListProps {
  grow?: boolean
}

const StyledTabsList = styled(Tabs.List, {
  shouldForwardProp: (prop) => prop !== "grow",
})<StyledTabsListProps>`
  display: flex;
  box-shadow: inset 0 -0.125rem 0 ${({ theme }) => theme.colors.border.primary};
  margin-block-end: ${({ theme }) => 3 * theme.spacingBase}rem;
  text-align: center;

  [role="tab"] {
    flex-grow: ${({ grow }) => grow && 1};
  }
`
