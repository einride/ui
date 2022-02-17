import styled from "@emotion/styled"
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react"
import { useWidthFromColumns } from "../../../../hooks/useWidthFromColumns"
import { BaseButton } from "../BaseButton/BaseButton"

export interface PrimaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  columns?: number | number[]
  isFullWidth?: boolean
}

export const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ children, isFullWidth = false, ...props }, ref) => {
    const width = useWidthFromColumns(props.columns, PrimaryButton.name)
    return (
      <StyledBaseButton
        isFullWidth={isFullWidth}
        width={width}
        {...props}
        ref={ref}
      >
        {children}
      </StyledBaseButton>
    )
  },
)

interface StyledBaseButtonProps {
  isFullWidth: boolean
  width: string | null
}

const StyledBaseButton = styled(BaseButton)<StyledBaseButtonProps>`
  min-width: 120px;
  ${({ isFullWidth }) => isFullWidth && "width: 100%;"}
  ${({ width }) => width};
  background: ${({ theme }) => theme.colors.buttons.background.primary};
  color: ${({ theme }) => theme.colors.buttons.text.primary};

  &:hover:not([aria-disabled="true"]) {
    background: ${({ theme }) => theme.colors.buttons.background.hover.primary};
  }

  &:active:not([aria-disabled="true"]) {
    background: ${({ theme }) =>
      theme.colors.buttons.background.active.primary};
  }

  &:focus:not([aria-disabled="true"]) {
    background: ${({ theme }) =>
      theme.colors.buttons.background.focused.primary};
  }
`
