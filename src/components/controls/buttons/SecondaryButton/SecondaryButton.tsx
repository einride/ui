import styled from "@emotion/styled"
import { ButtonHTMLAttributes, ReactNode } from "react"
import { useWidthFromColumns } from "../../../../hooks/useWidthFromColumns"
import { BaseButton } from "../BaseButton/BaseButton"

export interface SecondaryButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  columns?: number | number[]
  isFullWidth?: boolean
}

export const SecondaryButton = ({
  children,
  isFullWidth = false,
  ...props
}: SecondaryButtonProps) => {
  const width = useWidthFromColumns(props.columns, SecondaryButton.name)
  return (
    <StyledBaseButton isFullWidth={isFullWidth} width={width} {...props}>
      {children}
    </StyledBaseButton>
  )
}

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

  &:hover:not(:disabled) {
    background: ${({ theme }) =>
      theme.colors.buttons.background.hover.secondary};
  }

  &:active:not(:disabled) {
    background: ${({ theme }) =>
      theme.colors.buttons.background.active.secondary};
  }
`
