import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from "react"
import { useMenu } from "./MenuProvider"

interface MenuItemProps extends ComponentPropsWithoutRef<"button"> {
  icon?: ReactNode
  onClick?: () => void
}

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ children, icon, onClick, ...props }, ref) => {
    const { handlers } = useMenu()

    const handleClick = (): void => {
      handlers.close()
      onClick?.()
    }

    return (
      <Wrapper onClick={handleClick} {...props} ref={ref}>
        {children}
        {icon}
      </Wrapper>
    )
  },
)

const Wrapper = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-block: ${({ theme }) => 1.5 * theme.spacer}px;
  padding-inline: ${({ theme }) => 1 * theme.spacer}px;
  color: ${({ theme }) => theme.colors.content.primary};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  transition-duration: ${({ theme }) => theme.transitions.easeIn.duration};
  transition-timing-function: ${({ theme }) => theme.transitions.easeIn.timingFunction};

  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }

  &:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border.selected};
  }
`
