import styled from "@emotion/styled"
import { ButtonHTMLAttributes, ElementType, forwardRef, ReactNode } from "react"
import { useWidthFromColumns } from "../../../../hooks/useWidthFromColumns"
import { Icon } from "../../../content/Icon/Icon"
import { BaseButton } from "../BaseButton/BaseButton"

export interface WithIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: ElementType
  children: ReactNode
  columns?: number | number[]
  isFullWidth?: boolean
  icon?: ReactNode
}

export const WithIconButton = forwardRef<HTMLButtonElement, WithIconButtonProps>(
  ({ children, isFullWidth = false, icon = <Icon name="arrowRight" />, ...props }, ref) => {
    const width = useWidthFromColumns(props.columns, WithIconButton.name)
    return (
      <StyledBaseButton isFullWidth={isFullWidth} width={width} {...props} ref={ref}>
        <ContentWrapper>
          <span className="einride-ui-with-icon-button-text">{children}</span>
          <IconWrapper className="einride-ui-with-icon-button-icon">{icon}</IconWrapper>
        </ContentWrapper>
      </StyledBaseButton>
    )
  },
)

interface StyledBaseButtonProps {
  isFullWidth: boolean
  width: string | null
}

export const StyledBaseButton = styled(BaseButton)<StyledBaseButtonProps>`
  ${({ isFullWidth }) => isFullWidth && "width: 100%;"}
  ${({ width }) => width};
  background: ${({ theme }) => theme.colors.buttons.background.primary};
  color: ${({ theme }) => theme.colors.buttons.text.primary};
  padding-left: ${({ theme }) => 2.5 * theme.spacer}px;
  padding-right: ${({ theme }) => 2 * theme.spacer}px;

  &:hover:not([aria-disabled="true"]) {
    text-decoration: none;
    background: ${({ theme }) => theme.colors.buttons.background.hover.primary};

    .einride-ui-with-icon-button-text {
      text-decoration: underline;
    }
  }

  &:active:not([aria-disabled="true"]) {
    background: ${({ theme }) => theme.colors.buttons.background.active.primary};
  }

  &:focus-visible {
    text-decoration: none;

    .einride-ui-with-icon-button-text {
      text-decoration: underline;
    }

    &:not([aria-disabled="true"]) {
      background: ${({ theme }) => theme.colors.buttons.background.focused.primary};
    }
  }

  &[aria-disabled="true"] {
    background: ${({ theme }) => theme.colors.buttons.background.disabled.primary};
    color: ${({ theme }) => theme.colors.buttons.text.disabled};

    .einride-ui-with-icon-button-icon {
      color: ${({ theme }) => theme.colors.buttons.text.disabled};
    }
  }
`

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const IconWrapper = styled.div`
  margin-left: ${({ theme }) => 2 * theme.spacer}px;
  color: ${({ theme }) => theme.colors.buttons.icon.primary};
  width: ${({ theme }) => 3 * theme.spacer}px;
`
