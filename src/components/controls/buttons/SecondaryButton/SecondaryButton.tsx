import styled from "@emotion/styled"
import { ButtonHTMLAttributes, ElementType, forwardRef, ReactNode } from "react"
import { useWidthFromColumns } from "../../../../hooks/useWidthFromColumns"
import { BaseButton } from "../BaseButton/BaseButton"
import { BaseButtonIcon } from "../BaseButton/BaseButtonIcon"

export interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Effective element used. */
  as?: ElementType

  /** Content of the button. */
  children: ReactNode

  /** @deprecated since version 6.16.5. */
  columns?: number | number[]

  /** Adds a loading spinner to the button. */
  isLoading?: boolean

  /** Sets the button to full width. */
  isFullWidth?: boolean

  /** Adds an icon to the right side of the button. */
  rightIcon?: ReactNode
}

export const SecondaryButton = forwardRef<HTMLButtonElement, SecondaryButtonProps>(
  ({ children, isLoading = false, rightIcon, isFullWidth = false, ...props }, ref) => {
    const width = useWidthFromColumns(props.columns, SecondaryButton.name)
    const hasIcon = !!rightIcon || isLoading

    return (
      <StyledBaseButton
        hasIcon={hasIcon}
        isFullWidth={isFullWidth}
        width={width}
        {...props}
        ref={ref}
      >
        <span className="einride-ui-secondary-button-text">{children}</span>
        {(rightIcon || isLoading) && (
          <BaseButtonIcon
            className="einride-ui-secondary-button-icon"
            icon={rightIcon}
            isLoading={isLoading}
          />
        )}
      </StyledBaseButton>
    )
  },
)

interface StyledBaseButtonProps {
  isFullWidth: boolean
  width: string | null
}

const StyledBaseButton = styled(BaseButton)<StyledBaseButtonProps>`
  ${({ isFullWidth }) => isFullWidth && "inline-size: 100%;"}
  ${({ width }) => width};
  background: ${({ theme }) => theme.colors.buttons.background.secondary};
  color: ${({ theme }) => theme.colors.buttons.text.secondary};

  &:hover:not([aria-disabled="true"]) {
    text-decoration: none;
    background: ${({ theme }) => theme.colors.buttons.background.hover.secondary};

    .einride-ui-secondary-button-text {
      text-decoration: underline;
    }
  }

  &:active:not([aria-disabled="true"]) {
    background: ${({ theme }) => theme.colors.buttons.background.active.secondary};

    .einride-ui-secondary-button-text {
      text-decoration: none;
    }
  }

  &:focus-visible:not([aria-disabled="true"]) {
    background: ${({ theme }) => theme.colors.buttons.background.focused.secondary};
  }

  &[aria-disabled="true"] {
    background: ${({ theme }) => theme.colors.buttons.background.disabled.secondary};
    color: ${({ theme }) => theme.colors.buttons.text.disabled};

    .einride-ui-secondary-button-icon {
      color: ${({ theme }) => theme.colors.content.tertiary};
    }
  }
`
