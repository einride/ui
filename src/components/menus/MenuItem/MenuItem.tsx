import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, ElementType, forwardRef, ReactNode } from "react"

interface MenuItemProps extends ComponentPropsWithoutRef<"div"> {
  /** Menu item content. */
  children: ReactNode

  /** Icon shown at the end of the menu item row. */
  icon?: ReactNode

  /** Define type of rendered HTML tag. */
  as?: ElementType
}

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  ({ children, icon, ...props }, forwardedRef) => {
    return (
      <StyledItem {...props} ref={forwardedRef}>
        {children}
        {icon}
      </StyledItem>
    )
  },
)

const StyledItem = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-block: ${({ theme }) => 1.5 * theme.spacer}px;
  padding-inline: ${({ theme }) => 1 * theme.spacer}px;
  color: ${({ theme }) => theme.colors.content.primary};
  background: ${({ theme }) => theme.colors.background.secondaryElevated};
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  pointer-events: auto;
  transition-duration: ${({ theme }) => theme.transitions.easeIn.duration};
  transition-timing-function: ${({ theme }) => theme.transitions.easeIn.timingFunction};

  &:focus-visible {
    outline: none;
    background: ${({ theme }) => theme.colors.background.tertiary};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border.selected};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
    box-shadow: none;
  }
`
