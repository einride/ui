import styled from "@emotion/styled"
import { ButtonHTMLAttributes, ReactNode } from "react"

export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const BaseButton = (props: BaseButtonProps) => {
  return <StyledButton {...props} />
}

const StyledButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  background: unset;
  border: none;
  height: ${({ theme }) => 6 * theme.spacer}px;
  border-radius: ${({ theme }) => 6 * theme.spacer}px;
  cursor: pointer;
  padding: 0 20px;

  &:disabled {
    background: ${({ theme }) => theme.colors.background.secondary};
    color: ${({ theme }) => theme.colors.content.disabled};
    cursor: not-allowed;

    svg {
      fill: ${({ theme }) => theme.colors.content.disabled};
    }
  }

  &:focus {
    text-decoration: underline;
    outline: none;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.border.selected};
  }
`
