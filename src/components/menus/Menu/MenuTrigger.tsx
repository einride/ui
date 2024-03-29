import styled from "@emotion/styled"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ComponentPropsWithoutRef, ReactNode, forwardRef } from "react"

interface MenuTriggerProps extends ComponentPropsWithoutRef<"button"> {
  /** Menu trigger. For example an `<IconButton>`. */
  children: ReactNode
}

export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(
  ({ children, ...props }, forwardedRef): React.JSX.Element => {
    return (
      <StyledTrigger asChild {...props} ref={forwardedRef}>
        {children}
      </StyledTrigger>
    )
  },
)

const StyledTrigger = styled(DropdownMenu.Trigger)`
  display: inline-flex;
`
