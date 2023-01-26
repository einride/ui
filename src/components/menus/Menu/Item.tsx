import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react"
import { MenuItem } from "../MenuItem/MenuItem"

interface MenuItemProps extends ComponentPropsWithoutRef<"div"> {
  /** Menu item content. */
  children: ReactNode

  /** Icon shown at the end of the menu item row. */
  icon?: ReactNode

  /** Event handler called when the user selects an item. */
  onSelect?: () => void
}

export const Item = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ children, icon, ...props }, forwardedRef) => {
    return (
      <MenuItem as={DropdownMenu.Item} {...props} ref={forwardedRef}>
        {children}
        {icon}
      </MenuItem>
    )
  },
)
