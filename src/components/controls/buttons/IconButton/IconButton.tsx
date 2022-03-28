import styled from "@emotion/styled"
import { ButtonHTMLAttributes, ElementType, forwardRef } from "react"
import { Icon, IconName } from "../../../content/Icon/Icon"
import { SecondaryButton } from "../SecondaryButton/SecondaryButton"

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string
  as?: ElementType
  icon?: IconName
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon = "arrowRight", ...props }, ref) => {
    return (
      <StyledBaseButton {...props} ref={ref}>
        <Icon name={icon} />
      </StyledBaseButton>
    )
  },
)

const StyledBaseButton = styled(SecondaryButton)<IconButtonProps>`
  width: ${({ theme }) => 6 * theme.spacer}px;
  height: ${({ theme }) => 6 * theme.spacer}px;
  min-width: ${({ theme }) => 6 * theme.spacer}px;
  border-radius: ${({ theme }) => 6 * theme.spacer}px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover:not([aria-disabled="true"]),
  &:focus-visible {
    text-decoration: none;
  }
`
