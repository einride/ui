import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react"

export interface MenuProps
  extends Omit<
    ComponentPropsWithoutRef<typeof DropdownMenu.Content>,
    "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart" | "style" | "title"
  > {
  /** Menu content. */
  children: ReactNode

  /** The open state of the dropdown menu when it is initially rendered. Use when you do not need to control its open state. */
  defaultOpen?: boolean

  /** The controlled open state of the dropdown menu. Must be used in conjunction with onOpenChange. */
  isOpen?: boolean

  /** Event handler called when the open state of the dropdown menu changes. */
  onOpenChange?: (open: boolean) => void
}

export const Menu = forwardRef<HTMLDivElement, MenuProps>(({ children, isOpen, ...props }, ref) => {
  return (
    <div ref={ref}>
      <DropdownMenu.Root
        {...(typeof isOpen === "boolean" && { open: isOpen })} // TODO: Change to `open` in next major?
        {...props}
      >
        {children}
      </DropdownMenu.Root>
    </div>
  )
})
