import styled from "@emotion/styled"
import * as Tabs from "@radix-ui/react-tabs"
import { ReactNode } from "react"

interface TabsListProps {
  /** Tabs list content. */
  children: ReactNode
}

export const TabsList = ({ children, ...props }: TabsListProps): JSX.Element => {
  return <StyledTabsList {...props}>{children}</StyledTabsList>
}

const StyledTabsList = styled(Tabs.List)`
  display: grid;
  grid-auto-flow: column;
  text-align: center;
`
