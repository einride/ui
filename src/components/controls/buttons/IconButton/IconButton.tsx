import styled from "@emotion/styled"
import { ButtonHTMLAttributes } from "react"
import { Icon, IconName } from "../../../content/Icon/Icon"
import { SecondaryButton } from "../SecondaryButton/SecondaryButton"

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string
  icon?: IconName
}

export const IconButton = ({
  icon = "arrowRight",
  ...props
}: IconButtonProps) => {
  return (
    <StyledBaseButton {...props}>
      <Icon name={icon} />
    </StyledBaseButton>
  )
}

const StyledBaseButton = styled(SecondaryButton)<IconButtonProps>`
  width: ${({ theme }) => 6 * theme.spacer}px;
  height: ${({ theme }) => 6 * theme.spacer}px;
  min-width: ${({ theme }) => 6 * theme.spacer}px;
  border-radius: ${({ theme }) => 6 * theme.spacer}px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover:not([aria-disabled="true"]),
  &:focus:not([aria-disabled="true"]) {
    text-decoration: none;
  }
`
