import { Theme } from "@emotion/react"
import styled from "@emotion/styled"
import * as React from "react"
import { ButtonHTMLAttributes, ReactNode } from "react"
import { BaseButton } from "../BaseButton/BaseButton"

export interface PrimaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  columns?: number | number[]
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
  columns?: number | number[]
  isFullWidth: boolean
  hasMinWidth: boolean
}

const StyledBaseButton = styled(BaseButton)<StyledBaseButtonProps>`
  ${({ hasMinWidth }) => hasMinWidth && "min-width: 120px;"}
  ${({ isFullWidth }) => isFullWidth && "width: 100%"};
  ${({ columns, theme }) => columns && getWidth(columns, theme)};
  background: ${({ theme }) => theme.colors.buttons.background.primary};
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

const getWidth = (columns: number | number[], theme: Theme) => {
  const customProp = "--einride-ui-primary-button-columns"
  return `
  ${typeof columns === "number" ? `${customProp}: ${columns};` : ""}
  ${Array.isArray(columns) && columns[0] && `${customProp}: ${columns[0]};`}
  ${theme.breakpoint.medium} {
      ${Array.isArray(columns) && columns[1] && `${customProp}: ${columns[1]};`}
  }
  ${theme.breakpoint.large} {
    ${Array.isArray(columns) && columns[2] && `${customProp}: ${columns[2]};`}
  }

  width: calc(((100vw - calc(${theme.grid.columns} + 1) * ${
    theme.grid.gap
  }) / ${theme.grid.columns} + ${theme.grid.gap}) * var(${customProp}) - ${
    theme.grid.gap
  })`
}
