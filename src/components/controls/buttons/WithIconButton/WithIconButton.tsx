import styled from "@emotion/styled"
import * as React from "react"
import { ButtonHTMLAttributes, ReactNode } from "react"
import { BaseButton } from "../BaseButton"

export interface WithIconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
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
  size = "small",
  ...props
}: WithIconButtonProps) => {
  return (
    <StyledBaseButton
      hasMinWidth={hasMinWidth}
      isFullWidth={isFullWidth}
      size={size}
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
}

const StyledBaseButton = styled(BaseButton)<StyledBaseButtonProps>`
  ${({ hasMinWidth }) => hasMinWidth && "min-width: 240px;"}
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
