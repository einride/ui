import styled from "@emotion/styled"
import * as Tabs from "@radix-ui/react-tabs"
import { ReactNode } from "react"

interface TabsContentProps {
  /** Tab content. */
  children: ReactNode

  /** A unique value that associates the content with a trigger. */
  value: string
}

export const TabsContent = ({ children, ...props }: TabsContentProps): JSX.Element => {
  return <StyledTabsContent {...props}>{children}</StyledTabsContent>
}

const StyledTabsContent = styled(Tabs.Content)`
  &:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 0.125rem ${({ theme }) => theme.colors.border.selected};
  }
`
