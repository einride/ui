import { ComponentPropsWithRef, forwardRef } from "react"
import { MenuProvider } from "./MenuProvider"

interface MenuProps extends ComponentPropsWithRef<"div"> {
  /** Position of the dropdown in relation to the trigger. Default is `bottom-start`. */
  position?: Position
}

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ children, position = "bottom-start", ...props }, ref) => {
    return (
      <MenuProvider position={position} {...props} ref={ref}>
        {children}
      </MenuProvider>
    )
  },
)

type Position = "top-start" | "top-end" | "bottom-start" | "bottom-end"
