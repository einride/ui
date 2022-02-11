import styled from "@emotion/styled"
import { ButtonHTMLAttributes, ReactNode } from "react"
import { useWidthFromColumns } from "../../../../hooks/useWidthFromColumns"
import { BaseButton } from "../BaseButton/BaseButton"

export interface TertiaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  columns?: number | number[]
  hasMinWidth?: boolean
  isFullWidth?: boolean
  size?: "small" | "large"
}

export const TertiaryButton = ({
  children,
  hasMinWidth = true,
  isFullWidth = false,
  size = "large",
  ...props
}: TertiaryButtonProps) => {
  const width = useWidthFromColumns(props.columns, TertiaryButton.name)
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
  background: ${({ theme }) => theme.colors.buttons.background.tertiary};
  color: ${({ theme }) => theme.colors.buttons.text.tertiary};

  &:hover:not(:disabled) {
    background: ${({ theme }) =>
      theme.colors.buttons.background.hover.tertiary};
  }

  &:active:not(:disabled) {
    background: ${({ theme }) =>
      theme.colors.buttons.background.active.tertiary};
  }
`
