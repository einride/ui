import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ReactNode } from "react"

interface MenuProps {
  children: ReactNode
}

export const Menu = ({ children }: MenuProps): JSX.Element => {
  return <DropdownMenu.Root>{children}</DropdownMenu.Root>
}
