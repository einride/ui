import * as RadixTabs from "@radix-ui/react-tabs"
import { ReactNode } from "react"

export interface TabsProps {
  /** Tabs content. */
  children: ReactNode

  /** The value of the tab that should be active when initially rendered. Use when you do not need to control the state of the tabs. */
  defaultValue?: string

  /** Event handler called when the value changes. */
  onValueChange?: (value: string) => void

  /** The controlled value of the tab to activate. Should be used in conjunction with `onValueChange`. */
  value?: string
}

export const Tabs = ({ children, ...props }: TabsProps): JSX.Element => {
  return <RadixTabs.Root {...props}>{children}</RadixTabs.Root>
}
