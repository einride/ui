import styled from "@emotion/styled"
import { ButtonHTMLAttributes, ElementType, forwardRef, ReactNode } from "react"
import { useWidthFromColumns } from "../../../../hooks/useWidthFromColumns"
import { BaseButton } from "../BaseButton/BaseButton"

export interface SecondaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: ElementType
  children: ReactNode
  columns?: number | number[]
  isFullWidth?: boolean
}

export const SecondaryButton = forwardRef<
  HTMLButtonElement,
  SecondaryButtonProps
>(({ children, isFullWidth = false, ...props }, ref) => {
  const width = useWidthFromColumns(props.columns, SecondaryButton.name)
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
})

interface StyledBaseButtonProps {
  isFullWidth: boolean
  width: string | null
}

const StyledBaseButton = styled(BaseButton)<StyledBaseButtonProps>`
  min-width: 120px;
  ${({ isFullWidth }) => isFullWidth && "width: 100%;"}
  ${({ width }) => width};
  background: ${({ theme }) => theme.colors.buttons.background.secondary};
  color: ${({ theme }) => theme.colors.buttons.text.secondary};

  &:hover:not([aria-disabled="true"]) {
    background: ${({ theme }) =>
      theme.colors.buttons.background.hover.secondary};
  }

  &:active:not([aria-disabled="true"]) {
    background: ${({ theme }) =>
      theme.colors.buttons.background.active.secondary};
  }

  &:focus-visible:not([aria-disabled="true"]) {
    background: ${({ theme }) =>
      theme.colors.buttons.background.focused.secondary};
  }
`
