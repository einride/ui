import { useDisclosure } from "@einride/hooks"
import styled from "@emotion/styled"
import { useClickOutside } from "@mantine/hooks"
import React, {
  cloneElement,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useRef,
  useEffect,
  useState,
} from "react"

interface MenuItem {
  key: string
  title: ReactNode
  onClick: () => void
  icon?: ReactNode
}

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  trigger: ReactNode
  menuItems: MenuItem[]
}

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  ({ trigger, menuItems, ...props }, ref) => {
    const { isOpen, handlers } = useDisclosure(false)
    const [triggerHeight, setTriggerHeight] = useState(0)

    const wrapperRef = useClickOutside(handlers.close)
    const triggerRef = useRef<HTMLDivElement>(null)

    const menuTrigger = cloneElement(trigger as React.ReactElement, {
      onClick: handlers.toggle,
      ref: triggerRef,
    })

    const handleItemClick = (itemOnClick: () => void): void => {
      handlers.close()
      itemOnClick()
    }

    useEffect(() => {
      if (triggerRef.current && triggerRef.current.clientHeight) {
        const height = triggerRef.current.clientHeight
        setTriggerHeight(height)
      }
    }, [])

    return (
      <MenuWrapper {...props} ref={wrapperRef}>
        {menuTrigger}
        {isOpen && (
          <MenuList ref={ref} triggerHeight={triggerHeight}>
            {menuItems.map((menuItem) => (
              <MenuItem key={menuItem.key} onClick={() => handleItemClick(menuItem.onClick)}>
                {menuItem.title}
                {menuItem.icon && <IconWrapper>{menuItem.icon}</IconWrapper>}
              </MenuItem>
            ))}
          </MenuList>
        )}
      </MenuWrapper>
    )
  },
)

const MenuWrapper = styled.div`
  position: relative;
  width: fit-content;
`
interface StyledMenuListProps {
  triggerHeight: number
}

const MenuList = styled.div<StyledMenuListProps>`
  display: inline-flex;
  position: absolute;
  top: ${({ triggerHeight, theme }) => triggerHeight + theme.spacer}px;
  right: 0;
  z-index: 1;
  flex-direction: column;
  width: max-content;
  padding: ${({ theme }) => 1 * theme.spacer}px ${({ theme }) => 1 * theme.spacer}px;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadii.lg};
`

const MenuItem = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ theme }) => 1.5 * theme.spacer}px ${({ theme }) => 1 * theme.spacer}px;
  color: ${({ theme }) => theme.colors.content.primary};
  background-color: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  transition-duration: ${({ theme }) => theme.transitions.morph.duration};
  transition-timing-function: ${({ theme }) => theme.transitions.morph.timingFunction};

  &:hover {
    background-color: ${({ theme }) => theme.colors.background.tertiary};
  }

  &:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border.selected};
  }
`

const IconWrapper = styled.div`
  margin-left: ${({ theme }) => 2 * theme.spacer}px;
  width: ${({ theme }) => 3 * theme.spacer}px;
`
