import styled from "@emotion/styled"
import { ButtonHTMLAttributes, ElementType, forwardRef } from "react"
import { Theme } from "../../../../lib/theme/theme"
import { Icon, IconName } from "../../../content/Icon/Icon"
import { BaseButton } from "../BaseButton/BaseButton"

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string
  as?: ElementType
  icon?: IconName
  variant?: Variant
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon = "arrowRight", variant = "secondary", ...props }, ref) => {
    return (
      <StyledBaseButton variant={variant} {...props} ref={ref}>
        <Icon name={icon} />
      </StyledBaseButton>
    )
  },
)

type Variant = "primary" | "secondary" | "tertiary"

const StyledBaseButton = styled(BaseButton)<{ variant: Variant }>`
  width: ${({ theme }) => 6 * theme.spacer}px;
  height: ${({ theme }) => 6 * theme.spacer}px;
  min-width: ${({ theme }) => 6 * theme.spacer}px;
  border-radius: ${({ theme }) => 6 * theme.spacer}px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme, variant }) => getBackground(theme, variant)};
  color: ${({ theme, variant }) => getColor(theme, variant)};

  &:hover:not([aria-disabled="true"]),
  &:focus-visible {
    text-decoration: none;
  }

  &:hover:not([aria-disabled="true"]) {
    background: ${({ theme, variant }) => getHoverBackground(theme, variant)};
  }

  &:active:not([aria-disabled="true"]) {
    background: ${({ theme, variant }) => getActiveBackground(theme, variant)};
  }

  &:focus-visible:not([aria-disabled="true"]) {
    background: ${({ theme, variant }) => getFocusBackground(theme, variant)};
  }

  &[aria-disabled="true"] {
    background: ${({ theme, variant }) => getDisabledBackground(theme, variant)};
    color: ${({ theme }) => theme.colors.buttons.text.disabled};
  }
`

const getBackground = (theme: Theme, variant: Variant): string => {
  switch (variant) {
    case "primary":
      return theme.colors.buttons.background.primary
    case "secondary":
      return theme.colors.buttons.background.secondary
    case "tertiary":
      return theme.colors.buttons.background.tertiary
    default:
      return theme.colors.buttons.background.primary
  }
}

const getColor = (theme: Theme, variant: Variant): string => {
  switch (variant) {
    case "primary":
      return theme.colors.buttons.text.primary
    case "secondary":
      return theme.colors.buttons.text.secondary
    case "tertiary":
      return theme.colors.buttons.text.tertiary
    default:
      return theme.colors.buttons.text.primary
  }
}

const getHoverBackground = (theme: Theme, variant: Variant): string => {
  switch (variant) {
    case "primary":
      return theme.colors.buttons.background.hover.primary
    case "secondary":
      return theme.colors.buttons.background.hover.secondary
    case "tertiary":
      return theme.colors.buttons.background.hover.tertiary
    default:
      return theme.colors.buttons.background.hover.primary
  }
}

const getActiveBackground = (theme: Theme, variant: Variant): string => {
  switch (variant) {
    case "primary":
      return theme.colors.buttons.background.active.primary
    case "secondary":
      return theme.colors.buttons.background.active.secondary
    case "tertiary":
      return theme.colors.buttons.background.active.tertiary
    default:
      return theme.colors.buttons.background.active.primary
  }
}

const getFocusBackground = (theme: Theme, variant: Variant): string => {
  switch (variant) {
    case "primary":
      return theme.colors.buttons.background.focused.primary
    case "secondary":
      return theme.colors.buttons.background.focused.secondary
    case "tertiary":
      return theme.colors.buttons.background.focused.tertiary
    default:
      return theme.colors.buttons.background.focused.primary
  }
}

const getDisabledBackground = (theme: Theme, variant: Variant): string => {
  switch (variant) {
    case "primary":
      return theme.colors.buttons.background.disabled.primary
    case "secondary":
      return theme.colors.buttons.background.disabled.secondary
    case "tertiary":
      return theme.colors.buttons.background.disabled.tertiary
    default:
      return theme.colors.buttons.background.disabled.primary
  }
}
