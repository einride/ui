import { Theme } from "@emotion/react"
import styled from "@emotion/styled"
import * as React from "react"

export interface AvatarProps {
  alt: string
  size?: Size
  src: string
}

export const Avatar = ({ size = "md", ...props }: AvatarProps) => {
  return <Image size={size} {...props} />
}

const Image = styled.img<{ size?: Size }>`
  width: ${({ size, theme }) => getDiameter(theme, size)}px;
  height: ${({ size, theme }) => getDiameter(theme, size)}px;
  border: 2px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ theme }) => 3 * theme.spacer}px;
`

type Size = "md" | "lg"

const getDiameter = (theme: Theme, size?: Size) => {
  switch (size) {
    case "md":
      return 5 * theme.spacer
    case "lg":
      return 6 * theme.spacer
    default:
      return 5 * theme.spacer
  }
}
