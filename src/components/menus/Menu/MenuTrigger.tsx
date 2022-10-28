import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react"

interface MenuTriggerProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode
}

export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(
  ({ children, ...props }, forwardedRef): JSX.Element => {
    return (
      <DropdownMenu.Trigger asChild {...props} ref={forwardedRef}>
        {children}
      </DropdownMenu.Trigger>
    )
  },
)
