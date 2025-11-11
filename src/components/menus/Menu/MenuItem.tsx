import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ComponentPropsWithoutRef, ReactNode } from "react"
import { Option } from "../Option/Option"

interface MenuItemProps extends ComponentPropsWithoutRef<"div"> {
  /** Menu item content. */
  children: ReactNode

  /** Icon shown at the end of the menu item row. */
  icon?: ReactNode

  /** Event handler called when the user selects an item. */
  onSelect?: () => void

  ref?: React.Ref<HTMLDivElement> | undefined
}

export const MenuItem = ({ ref, children, icon, ...props }: MenuItemProps): React.JSX.Element => {
  return (
    <Option as={DropdownMenu.Item} variant="secondary" {...props} ref={ref}>
      {children}
      {icon}
    </Option>
  )
}
