import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, ElementType, ReactNode, forwardRef } from "react"
import { BaseButton } from "../BaseButton/BaseButton"
import { BaseButtonIcon } from "../BaseButton/BaseButtonIcon"

export interface PrimaryButtonProps extends ComponentPropsWithoutRef<"button"> {
  /** Effective element used. */
  as?: ElementType

  /** Content of the button. */
  children: ReactNode

  /** Adds a loading spinner to the button. */
  isLoading?: boolean

  /** Sets the button to full width. */
  isFullWidth?: boolean

  /** Adds an icon to the right side of the button. */
  rightIcon?: ReactNode
}

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ children, isLoading = false, rightIcon, isFullWidth = false, ...props }, ref) => {
    const hasIcon = !!rightIcon || isLoading
    return (
      <StyledBaseButton hasIcon={hasIcon} isFullWidth={isFullWidth} {...props} ref={ref}>
        <span data-content>{children}</span>
        {(rightIcon || isLoading) && (
          <BaseButtonIcon
            data-icon
            icon={rightIcon}
            innerWrapperProps={{ color: "positiveInverted" }}
            isLoading={isLoading}
          />
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
  background: ${({ theme }) => theme.colors.buttons.background.primary};
  color: ${({ theme }) => theme.colors.buttons.text.primary};

  &:disabled {
    background: ${({ theme }) => theme.colors.buttons.background.disabled.primary};
    color: ${({ theme }) => theme.colors.buttons.text.disabled};

    [data-icon] {
      color: ${({ theme }) => theme.colors.content.tertiary};
    }
  }

  &:not(:disabled) {
    &:hover {
      text-decoration: none;
      background: ${({ theme }) => theme.colors.buttons.background.hover.primary};

      [data-content] {
        text-decoration: underline;
      }
    }

    &:active {
      background: ${({ theme }) => theme.colors.buttons.background.active.primary};

      [data-content] {
        text-decoration: none;
      }
    }

    &:focus-visible {
      background: ${({ theme }) => theme.colors.buttons.background.focused.primary};
    }
  }
`
