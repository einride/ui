import styled from "@emotion/styled"
import { ElementType, forwardRef, ImgHTMLAttributes } from "react"
import { Theme } from "../../../lib/theme/theme"
import { Radius } from "../../../lib/theme/types"

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string
  as?: ElementType
  radius?: Radius
  size?: Size
  src: string
}

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ radius = "full", size = "md", ...props }, ref) => {
    return <Image radius={radius} size={size} {...props} ref={ref} />
  },
)

type Size = "sm" | "md"

const Image = styled.img<{ radius: Radius; size: Size }>`
  height: ${({ radius, theme, size }) => getSize(radius, theme, size)}px;
  width: ${({ radius, theme, size }) => getSize(radius, theme, size)}px;
  border: 2px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ radius, theme }) => theme.borderRadii[radius]};
`

const getSize = (radius: Radius, theme: Theme, size: Size): number => {
  if (radius === "full") {
    switch (size) {
      case "sm":
        return 5 * theme.spacer
      case "md":
        return 6 * theme.spacer
      default:
        return 6 * theme.spacer
    }
  }
  switch (size) {
    case "sm":
      return 4 * theme.spacer
    case "md":
      return 5 * theme.spacer
    default:
      return 5 * theme.spacer
  }
}
