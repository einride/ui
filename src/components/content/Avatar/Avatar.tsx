import isPropValid from "@emotion/is-prop-valid"
import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ImgHTMLAttributes, useState } from "react"
import { BackgroundColor, ContentColor, Radius, Theme } from "../../../lib/theme/types"
import { getInitials } from "./getInitials"

interface AvatarBaseProps {
  /** Effective element used. */
  as?: ElementType

  /** Color of the avatar.  */
  color?: ContentColor

  /** Background color of the avatar. */
  background?: BackgroundColor

  /** Radius of the avatar. Default is `full`. */
  radius?: Radius

  /** Size of the avatar. Default is `md`. */
  size?: Size
}

interface AvatarImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Alternate text of the image. */
  alt: string

  /** Name of the user, used to compute initials. */
  name?: string | undefined

  /** Source of the image. */
  src: string | undefined
}

interface AvatarInitialsProps extends HTMLAttributes<HTMLDivElement> {
  /** Name of the user, used to compute initials. */
  name: string | undefined
}

export type AvatarProps = AvatarBaseProps & (AvatarImageProps | AvatarInitialsProps)

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ background = "primary", color = "primary", radius = "full", size = "md", ...props }, ref) => {
    const [hasError, setHasError] = useState(false)

    if ("src" in props) {
      const { name, src, ...rest } = props

      if (hasError) {
        return (
          <Image
            as="div"
            {...rest}
            background={background}
            color={color}
            radius={radius}
            size={size}
            ref={ref}
          >
            {getInitials(name)}
          </Image>
        )
      }

      return (
        <Image
          {...rest}
          background={background}
          color={color}
          onError={() => setHasError(true)}
          radius={radius}
          size={size}
          src={src}
          ref={ref}
        />
      )
    }

    const { name, ...rest } = props
    return (
      <Image
        as="div"
        {...rest}
        background={background}
        color={color}
        radius={radius}
        size={size}
        ref={ref}
      >
        {getInitials(name)}
      </Image>
    )
  },
)

type Size = "sm" | "md"

interface ImageProps {
  background: BackgroundColor
  color: ContentColor
  radius: Radius
  size: Size
}

const Image = styled("img", {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "color",
})<ImageProps>`
  background: ${({ background, theme }) => theme.colors.background[background]};
  color: ${({ color, theme }) => theme.colors.content[color]};
  height: ${({ radius, theme, size }) => getSize(radius, theme, size)}px;
  width: ${({ radius, theme, size }) => getSize(radius, theme, size)}px;
  border: 2px solid ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ radius, theme }) => theme.borderRadii[radius]};
  display: flex;
  align-items: center;
  justify-content: center;
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
