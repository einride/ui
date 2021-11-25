import styled from "@emotion/styled"
import * as React from "react"
import { ButtonHTMLAttributes } from "react"
import { SecondaryButton } from "../SecondaryButton/SecondaryButton"

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string
  size?: "small" | "large"
}

export const IconButton = ({
  icon = "→",
  size = "small",
  ...props
}: IconButtonProps) => {
  return (
    <StyledBaseButton size={size} {...props}>
      {icon}
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
