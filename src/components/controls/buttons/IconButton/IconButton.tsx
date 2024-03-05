import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, ElementType, forwardRef } from "react"
import { Icon, IconName } from "../../../content/Icon/Icon"
import { BaseButton } from "../BaseButton/BaseButton"

export interface IconButtonProps extends ComponentPropsWithoutRef<"button"> {
  /** Accessible name of the icon button. Describe what happens when you click the button. */
  "aria-label": string

  /** Rendered element. */
  as?: ElementType

  /** Makes the button disabled. */
  disabled?: boolean

  /** Icon to render in the button. Default is `arrowRight`. */
  icon?: IconName

  /** Color variant of the icon button. Default is `secondary`. */
  variant?: Variant
}

/** Small button with icon only. */
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

interface StyledBaseButtonProps {
  variant: Variant
}

const StyledBaseButton = styled(BaseButton)<StyledBaseButtonProps>`
  inline-size: ${({ theme }) => 6 * theme.spacingBase}rem;
  block-size: ${({ theme }) => 6 * theme.spacingBase}rem;
  flex-shrink: 0; // prevent shrinking in flex layouts
  border-radius: ${({ theme }) => theme.borderRadii.full};
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme, variant }) => theme.colors.buttons.background[variant]};
  color: ${({ theme, variant }) => theme.colors.buttons.text[variant]};

  &:disabled {
    background: ${({ theme, variant }) => theme.colors.buttons.background.disabled[variant]};
    color: ${({ theme }) => theme.colors.buttons.text.disabled};
    text-decoration: none;
  }

  &:not(:disabled) {
    &:hover {
      background: ${({ theme, variant }) => theme.colors.buttons.background.hover[variant]};
      text-decoration: none;
    }

    &:active {
      background: ${({ theme, variant }) => theme.colors.buttons.background.active[variant]};
    }

    &:focus-visible {
      background: ${({ theme, variant }) => theme.colors.buttons.background.focused[variant]};
      text-decoration: none;
    }
  }
`
