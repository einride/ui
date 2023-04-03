import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, ElementType, ReactNode, forwardRef } from "react"
import { BaseButton } from "../BaseButton/BaseButton"
import { BaseButtonIcon } from "../BaseButton/BaseButtonIcon"

export interface SecondaryButtonProps extends ComponentPropsWithoutRef<"button"> {
  /** Rendered element. */
  as?: ElementType

  /** Content of the button. */
  children: ReactNode

  /** Makes the button disabled. */
  disabled?: boolean

  /** Adds a loading spinner to the button. */
  isLoading?: boolean

  /** Sets the button to full width. */
  isFullWidth?: boolean

  /** Adds an icon to the right side of the button. */
  rightIcon?: ReactNode
}

export const SecondaryButton = forwardRef<HTMLButtonElement, SecondaryButtonProps>(
  ({ children, isLoading = false, rightIcon, isFullWidth = false, ...props }, ref) => {
    const hasIcon = !!rightIcon || isLoading
    return (
      <StyledBaseButton hasIcon={hasIcon} isFullWidth={isFullWidth} {...props} ref={ref}>
        <span data-content>{children}</span>
        {(rightIcon || isLoading) && (
          <BaseButtonIcon data-icon icon={rightIcon} isLoading={isLoading} />
        )}
      </StyledBaseButton>
    )
  },
)

interface StyledBaseButtonProps {
  isFullWidth: boolean
}

const StyledBaseButton = styled(BaseButton)<StyledBaseButtonProps>`
  ${({ isFullWidth }) => isFullWidth && "inline-size: 100%;"}
  background: ${({ theme }) => theme.colors.buttons.background.secondary};
  color: ${({ theme }) => theme.colors.buttons.text.secondary};

  &:disabled {
    background: ${({ theme }) => theme.colors.buttons.background.disabled.secondary};
    color: ${({ theme }) => theme.colors.buttons.text.disabled};

    [data-icon] {
      color: ${({ theme }) => theme.colors.content.tertiary};
    }
  }

  &:not(:disabled) {
    &:hover {
      text-decoration: none;
      background: ${({ theme }) => theme.colors.buttons.background.hover.secondary};

      [data-content] {
        text-decoration: underline;
      }
    }

    &:active {
      background: ${({ theme }) => theme.colors.buttons.background.active.secondary};

      [data-content] {
        text-decoration: none;
      }
    }

    &:focus-visible {
      background: ${({ theme }) => theme.colors.buttons.background.focused.secondary};
    }
  }
`
