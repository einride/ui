import styled from "@emotion/styled"
import * as React from "react"
import { ButtonHTMLAttributes, ReactNode } from "react"
import { BaseButton } from "../BaseButton/BaseButton"

export interface PrimaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  hasMinWidth?: boolean
  isFullWidth?: boolean
  size?: "small" | "large"
}

export const PrimaryButton = ({
  children,
  hasMinWidth = true,
  isFullWidth = false,
  size = "small",
  ...props
}: PrimaryButtonProps) => {
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
  isFullWidth: boolean
  hasMinWidth: boolean
}

const StyledBaseButton = styled(BaseButton)<StyledBaseButtonProps>`
  ${({ hasMinWidth }) => hasMinWidth && "min-width: 120px;"}
  ${({ isFullWidth }) => isFullWidth && "width: 100%;"}
  background-color: ${({ theme }) => theme.colors.buttons.background.primary};
  color: ${({ theme }) => theme.colors.buttons.text.primary};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) =>
      theme.colors.buttons.background.hover.primary};
  }

  &:active:not(:disabled) {
    background-color: ${({ theme }) =>
      theme.colors.buttons.background.active.primary};
  }
`
