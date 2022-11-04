import styled from "@emotion/styled"
import { ButtonHTMLAttributes, ElementType, forwardRef, ReactNode } from "react"
import { useWidthFromColumns } from "../../../../hooks/useWidthFromColumns"
import { BaseButton } from "../BaseButton/BaseButton"
import { BaseButtonIcon } from "../BaseButton/BaseButtonIcon"

export interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ children, isLoading = false, rightIcon, isFullWidth = false, ...props }, ref) => {
    const width = useWidthFromColumns(props.columns, PrimaryButton.name)
    const hasIcon = !!rightIcon || isLoading

    return (
      <StyledBaseButton
        hasIcon={hasIcon}
        isFullWidth={isFullWidth}
        width={width}
        {...props}
        ref={ref}
      >
        <span className="einride-ui-primary-button-text">{children}</span>
        {(rightIcon || isLoading) && (
          <BaseButtonIcon
            className="einride-ui-primary-button-icon"
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
  background: ${({ theme }) => theme.colors.buttons.background.primary};
  color: ${({ theme }) => theme.colors.buttons.text.primary};

  &:hover:not([aria-disabled="true"]) {
    text-decoration: none;
    background: ${({ theme }) => theme.colors.buttons.background.hover.primary};

    .einride-ui-primary-button-text {
      text-decoration: underline;
    }
  }

  &:active:not([aria-disabled="true"]) {
    background: ${({ theme }) => theme.colors.buttons.background.active.primary};

    .einride-ui-primary-button-text {
      text-decoration: none;
    }
  }

  &:focus-visible:not([aria-disabled="true"]) {
    background: ${({ theme }) => theme.colors.buttons.background.focused.primary};
  }

  &[aria-disabled="true"] {
    background: ${({ theme }) => theme.colors.buttons.background.disabled.primary};
    color: ${({ theme }) => theme.colors.buttons.text.disabled};

    .einride-ui-primary-button-icon {
      color: ${({ theme }) => theme.colors.content.tertiary};
    }
  }
`
