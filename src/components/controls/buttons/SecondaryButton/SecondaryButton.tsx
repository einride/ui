import styled from "@emotion/styled"
import * as React from "react"
import { ButtonHTMLAttributes, ReactNode } from "react"
import { BaseButton } from "../BaseButton/BaseButton"

export interface SecondaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  hasMinWidth?: boolean
  isFullWidth?: boolean
  size?: "small" | "large"
}

export const SecondaryButton = ({
  children,
  hasMinWidth = true,
  isFullWidth = false,
  size = "small",
  ...props
}: SecondaryButtonProps) => {
  return (
    <StyledBaseButton
      hasMinWidth={hasMinWidth}
      isFullWidth={isFullWidth}
      size={size}
      {...props}
    >
      {children}
    </StyledBaseButton>
  )
}

interface StyledBaseButtonProps {
  hasMinWidth: boolean
  isFullWidth: boolean
}

const StyledBaseButton = styled(BaseButton)<StyledBaseButtonProps>`
  ${({ hasMinWidth }) => hasMinWidth && "min-width: 120px;"}
  ${({ isFullWidth }) => isFullWidth && "width: 100%;"}
      background-color: ${({ theme }) =>
    theme.colors.buttons.background.secondary};
  color: ${({ theme }) => theme.colors.buttons.text.secondary};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) =>
      theme.colors.buttons.background.hover.secondary};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) =>
      theme.colors.buttons.background.active.secondary};
  }
`
