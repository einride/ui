import styled from "@emotion/styled"
import { ButtonHTMLAttributes, ElementType, forwardRef, ReactNode } from "react"
import { useWidthFromColumns } from "../../../../hooks/useWidthFromColumns"
import { BaseButton } from "../BaseButton/BaseButton"
import { BaseButtonIcon } from "../BaseButton/BaseButtonIcon"

export interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: ElementType
  children: ReactNode
  columns?: number | number[]
  isLoading?: boolean
  isFullWidth?: boolean
  rightIcon?: ReactNode
}

export const SecondaryButton = forwardRef<HTMLButtonElement, SecondaryButtonProps>(
  ({ children, isLoading = false, rightIcon, isFullWidth = false, ...props }, ref) => {
    const width = useWidthFromColumns(props.columns, SecondaryButton.name)
    return (
      <StyledBaseButton isFullWidth={isFullWidth} width={width} {...props} ref={ref}>
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
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 120px;
  ${({ isFullWidth }) => isFullWidth && "width: 100%;"}
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
  }
`
