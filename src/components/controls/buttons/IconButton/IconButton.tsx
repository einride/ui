import styled from "@emotion/styled"
import { ButtonHTMLAttributes } from "react"
import { Icon, IconName } from "../../../content/Icon/Icon"
import { SecondaryButton } from "../SecondaryButton/SecondaryButton"

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string
  icon?: IconName
  size?: "small" | "large"
}

export const IconButton = ({
  icon = "arrowRight",
  size = "large",
  ...props
}: IconButtonProps) => {
  return (
    <StyledBaseButton size={size} {...props}>
      <Icon name={icon} />
    </StyledBaseButton>
  )
}
const getWidth = (size?: "small" | "large") => {
  switch (size) {
    case "small":
      return 48
    default:
      return 56
  }
}

const StyledBaseButton = styled(SecondaryButton)<IconButtonProps>`
  min-width: ${({ size }) => getWidth(size)}px;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    text-decoration: none;
  }
`
