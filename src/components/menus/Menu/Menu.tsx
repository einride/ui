import { ComponentPropsWithoutRef, forwardRef } from "react"
import { MenuProvider } from "./MenuProvider"

interface MenuProps extends ComponentPropsWithoutRef<"div"> {
  /** Position of the dropdown in relation to the trigger. Default is `bottom-start`. */
  dropdownPosition?: DropdownPosition
}

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ children, dropdownPosition = "bottom-start", ...props }, ref) => {
    return (
      <MenuProvider dropdownPosition={dropdownPosition} {...props} ref={ref}>
        {children}
      </MenuProvider>
    )
  },
)

type DropdownPosition = "top-start" | "top-end" | "bottom-start" | "bottom-end"
