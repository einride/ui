import styled from "@emotion/styled"
import { ButtonHTMLAttributes, ElementType, forwardRef, MouseEvent, ReactNode } from "react"

export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: ElementType
  children: ReactNode
}

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ disabled, onClick, ...props }, ref) => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>): void => {
      if (disabled) return
      onClick?.(e)
    }
    return (
      <StyledButton
        {...(disabled && { "aria-disabled": "true" })}
        onClick={handleClick}
        {...props}
        ref={ref}
      />
    )
  },
)

const StyledButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  height: ${({ theme }) => 6 * theme.spacer}px;
  border-radius: ${({ theme }) => theme.borderRadii.xl};
  cursor: pointer;
  padding: 0 ${({ theme }) => 2 * theme.spacer}px;

  &:hover:not([aria-disabled="true"]) {
    text-decoration: underline;
  }

  &:active:not([aria-disabled="true"]) {
    text-decoration: none;
  }

  &:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border.selected};
    text-decoration: underline;
  }

  &[aria-disabled="true"] {
    cursor: not-allowed;
  }
`
