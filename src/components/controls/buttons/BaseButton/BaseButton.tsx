import styled from "@emotion/styled"
import { ButtonHTMLAttributes, ReactNode } from "react"

export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const BaseButton = ({ disabled, ...props }: BaseButtonProps) => {
  return (
    <StyledButton {...(disabled && { "aria-disabled": "true" })} {...props} />
  )
}

const StyledButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  height: ${({ theme }) => 6 * theme.spacer}px;
  border-radius: ${({ theme }) => 3 * theme.spacer}px;
  cursor: pointer;
  padding: 0 ${({ theme }) => 3 * theme.spacer}px;

  &:hover:not([aria-disabled="true"]) {
    text-decoration: underline;
  }

  &:focus:not([aria-disabled="true"]) {
    outline: none;
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border.selected};
    text-decoration: underline;
  }

  &:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border.selected};
  }

  &[aria-disabled="true"] {
    background: ${({ theme }) => theme.colors.buttons.background.disabled};
    color: ${({ theme }) => theme.colors.buttons.text.disabled};
    cursor: not-allowed;
  }
`
