import styled from "@emotion/styled"
import { ButtonHTMLAttributes, ElementType, forwardRef, ReactNode } from "react"
import { useWidthFromColumns } from "../../../../hooks/useWidthFromColumns"
import { BaseButton } from "../BaseButton/BaseButton"
import { BaseButtonIcon } from "../BaseButton/BaseButtonIcon"

export interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: ElementType
  children: ReactNode
  columns?: number | number[]
  isLoading?: boolean
  isFullWidth?: boolean
  rightIcon?: ReactNode
}

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ children, isLoading = false, rightIcon, isFullWidth = false, ...props }, ref) => {
    const width = useWidthFromColumns(props.columns, PrimaryButton.name)

    return (
      <StyledBaseButton isFullWidth={isFullWidth} width={width} {...props} ref={ref}>
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
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 120px;
  ${({ isFullWidth }) => isFullWidth && "width: 100%;"}
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
  }

  &:focus-visible:not([aria-disabled="true"]) {
    background: ${({ theme }) => theme.colors.buttons.background.focused.primary};
  }

  &[aria-disabled="true"] {
    background: ${({ theme }) => theme.colors.buttons.background.disabled.primary};
    color: ${({ theme }) => theme.colors.buttons.text.disabled};
  }
`
