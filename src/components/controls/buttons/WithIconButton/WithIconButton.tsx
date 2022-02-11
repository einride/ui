import styled from "@emotion/styled"
import { ButtonHTMLAttributes, ReactNode } from "react"
import { useWidthFromColumns } from "../../../../hooks/useWidthFromColumns"
import { BaseButton } from "../BaseButton/BaseButton"

export interface WithIconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  columns?: number | number[]
  hasMinWidth?: boolean
  isFullWidth?: boolean
  icon?: string
  size?: "small" | "large"
}

export const WithIconButton = ({
  children,
  hasMinWidth = true,
  isFullWidth = false,
  icon = "→",
  size = "large",
  ...props
}: WithIconButtonProps) => {
  const width = useWidthFromColumns(props.columns, WithIconButton.name)
  return (
    <StyledBaseButton
      hasMinWidth={hasMinWidth}
      isFullWidth={isFullWidth}
      size={size}
      width={width}
      {...props}
    >
      <ContentWrapper>
        <span className="text">{children}</span>
        <IconWrapper>{icon}</IconWrapper>
      </ContentWrapper>
    </StyledBaseButton>
  )
}

interface StyledBaseButtonProps {
  hasMinWidth: boolean
  isFullWidth: boolean
  width: string | null
}

export const StyledBaseButton = styled(BaseButton)<StyledBaseButtonProps>`
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

  &:focus {
    text-decoration: none;
    border: none;

    .text {
      text-decoration: underline;
    }
  }
`

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const IconWrapper = styled.div`
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.positive};
  text-decoration: none !important;
`
