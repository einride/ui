import styled from "@emotion/styled"
import { ButtonHTMLAttributes, ReactNode } from "react"
import { useWidthFromColumns } from "../../../../hooks/useWidthFromColumns"
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
  size = "large",
  ...props
}: PrimaryButtonProps) => {
  const width = useWidthFromColumns(props.columns, PrimaryButton.name)
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
  isFullWidth: boolean
  hasMinWidth: boolean
  width: string | null
}

const StyledBaseButton = styled(BaseButton)<StyledBaseButtonProps>`
  ${({ hasMinWidth }) => hasMinWidth && "min-width: 120px;"}
  ${({ isFullWidth }) => isFullWidth && "width: 100%;"}
  ${({ width }) => width};
  background: ${({ theme }) => theme.colors.buttons.background.primary};
  color: ${({ theme }) => theme.colors.buttons.text.primary};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.buttons.background.hover.primary};
  }

  &:active:not(:disabled) {
    background: ${({ theme }) =>
      theme.colors.buttons.background.active.primary};
  }
`
