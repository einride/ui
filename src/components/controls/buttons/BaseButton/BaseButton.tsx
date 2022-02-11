import styled from "@emotion/styled"
import { ButtonHTMLAttributes, ReactNode } from "react"

export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  size: "small" | "large"
}

export const BaseButton = (props: BaseButtonProps) => {
  return <StyledButton {...props} />
}

const SMALL_HEIGHT_PIXELS = 48
const LARGE_HEIGHT_PIXELS = 56

interface StyledButtonProps {
  size: "small" | "large"
}

const StyledButton = styled.button<StyledButtonProps>`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  background-color: unset;
  border: none;
  height: ${({ size }) =>
    size === "small" ? SMALL_HEIGHT_PIXELS : LARGE_HEIGHT_PIXELS}px;
  border-radius: ${LARGE_HEIGHT_PIXELS}px;
  cursor: pointer;
  padding: 0 20px;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.background.secondary};
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
