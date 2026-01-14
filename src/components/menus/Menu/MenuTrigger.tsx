import styled from "@emotion/styled"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ComponentPropsWithoutRef, ReactNode } from "react"

interface MenuTriggerProps extends ComponentPropsWithoutRef<"button"> {
  /** Menu trigger. For example an `<IconButton>`. */
  children: ReactNode

  ref?: React.Ref<HTMLButtonElement> | undefined
}

export const MenuTrigger = ({ ref, children, ...props }: MenuTriggerProps): React.JSX.Element => {
  return (
    <StyledTrigger asChild {...props} ref={ref}>
      {children}
    </StyledTrigger>
  )
}

const StyledTrigger = styled(DropdownMenu.Trigger)`
  display: inline-flex;
`
