import styled from "@emotion/styled"
import * as React from "react"
import { ButtonHTMLAttributes, ReactNode } from "react"
import { useWidthFromColumns } from "../../../../hooks/useWidthFromColumns"
import { BaseButton } from "../BaseButton/BaseButton"

export interface SecondaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  columns?: number | number[]
  hasMinWidth?: boolean
  isFullWidth?: boolean
  size?: "small" | "large"
}

export const SecondaryButton = ({
  children,
  hasMinWidth = true,
  isFullWidth = false,
  size = "large",
  ...props
}: SecondaryButtonProps) => {
  const width = useWidthFromColumns(props.columns, SecondaryButton.name)
  return (
    <StyledBaseButton
      hasMinWidth={hasMinWidth}
      isFullWidth={isFullWidth}
      size={size}
      width={width}
      {...props}
    >
      {children}
    </StyledBaseButton>
  )
}

interface StyledBaseButtonProps {
  hasMinWidth: boolean
  isFullWidth: boolean
  width: string | null
}

const StyledBaseButton = styled(BaseButton)<StyledBaseButtonProps>`
  ${({ hasMinWidth }) => hasMinWidth && "min-width: 120px;"}
  ${({ isFullWidth }) => isFullWidth && "width: 100%;"}
  ${({ width }) => width};
  background: ${({ theme }) => theme.colors.buttons.background.secondary};
  color: ${({ theme }) => theme.colors.buttons.text.secondary};

  &:hover:not(:disabled) {
    background: ${({ theme }) =>
      theme.colors.buttons.background.hover.secondary};
  }

  &:active:not(:disabled) {
    background: ${({ theme }) =>
      theme.colors.buttons.background.active.secondary};
  }
`
