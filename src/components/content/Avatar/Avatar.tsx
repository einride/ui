import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ImgHTMLAttributes } from "react"
import { Theme } from "../../../lib/theme/theme"
import { Radius } from "../../../lib/theme/types"

interface AvatarBaseProps {
  /** Effective element used. */
  as?: ElementType

  /** Radius of the avatar. Default is `full`. */
  radius?: Radius

  /** Size of the avatar. Default is `md`. */
  size?: Size
}

interface AvatarImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Alternate text of the image. */
  alt: string

  /** Source of the image. */
  src: string | undefined
}

interface AvatarInitialsProps extends HTMLAttributes<HTMLDivElement> {
  /** Name of the user, used to compute initials. */
  name: string | undefined
}

export type AvatarProps = AvatarBaseProps & (AvatarImageProps | AvatarInitialsProps)

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ radius = "full", size = "md", ...props }, ref) => {
    if ("src" in props) {
      const { src, ...rest } = props
      return <Image {...rest} radius={radius} size={size} src={src} ref={ref} />
    }

    if ("name" in props) {
      const { name, ...rest } = props
      return (
        <Initials {...rest} radius={radius} size={size} ref={ref}>
          {getInitials(name)}
        </Initials>
      )
    }

    return null
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

const Initials = styled(Image)`
  background: ${({ theme }) => theme.colors.background.reverse};
  color: ${({ theme }) => theme.colors.content.reverse};
  display: flex;
  align-items: center;
  justify-content: center;
`.withComponent("div")

export const getInitials = (displayName: string | null | undefined): string => {
  // when display name is not provided, show "U" as a placeholder for "User"
  if (!displayName) return "U"

  const parts = displayName.split(" ")

  if (parts.length === 1) return parts[0].charAt(0)
  if (parts.length >= 2) return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`

  return "U"
}
