import isPropValid from "@emotion/is-prop-valid"
import styled from "@emotion/styled"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { ComponentPropsWithoutRef, ElementType, forwardRef } from "react"
import { getBackground, getBorderRadius, getColor } from "../../../lib/theme/prop-system"
import { Background, BorderRadius, Color } from "../../../lib/theme/props"
import { Theme } from "../../../lib/theme/types"
import { getInitials } from "./getInitials"

interface AvatarBaseProps {
  /** Rendered element. */
  as?: ElementType

  /** Color of the avatar. */
  color?: Color

  /** Background color of the avatar. */
  background?: Background

  /** Radius of the avatar. Default is `full`. */
  radius?: BorderRadius

  /** Size of the avatar. Default is `md`. */
  size?: Size
}

interface AvatarImageProps extends ComponentPropsWithoutRef<"img"> {
  /** Alternate text of the image. */
  alt: string

  /** Name of the user, used to compute initials. */
  name?: string | undefined

  /** Source of the image. */
  src: string | undefined
}

interface AvatarInitialsProps extends ComponentPropsWithoutRef<"div"> {
  /** Name of the user, used to compute initials. */
  name: string | undefined
}

export type AvatarProps = AvatarBaseProps & (AvatarImageProps | AvatarInitialsProps)

/** An avatar with an image or initials. */
export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ background = "primary", color = "primary", radius = "full", size = "md", ...props }, ref) => {
    return (
      <AvatarPrimitive.Root ref={ref}>
        {"src" in props && (
          <Image background={background} textColor={color} radius={radius} size={size} {...props} />
        )}
        <Fallback
          background={background}
          textColor={color}
          radius={radius}
          size={size}
          delayMs={100000}
          {...props}
        >
          {getInitials(props.name)}
        </Fallback>
      </AvatarPrimitive.Root>
    )
  },
)

type Size = "sm" | "md"

interface WrapperProps {
  inverted?: boolean
  background: Background
  radius: BorderRadius
  size: Size
  textColor: Color
}

const propsToExclude = ["radius", "name"]

const Wrapper = styled("div", {
  shouldForwardProp: (prop) => isPropValid(prop) && !propsToExclude.includes(prop),
})<WrapperProps>`
  background: ${({ background, theme }) => getBackground(background, theme)};
  color: ${({ textColor, theme }) => getColor(textColor, theme)};
  block-size: ${({ radius, theme, size }) => getSize(radius, theme, size)}rem;
  inline-size: ${({ radius, theme, size }) => getSize(radius, theme, size)}rem;
  border: ${({ theme }) => 0.25 * theme.spacingBase}rem solid
    ${({ theme }) => theme.colors.border.primary};
  border-radius: ${({ radius, theme }) => getBorderRadius(radius, theme)};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Image = Wrapper.withComponent(AvatarPrimitive.Image)
const Fallback = Wrapper.withComponent(AvatarPrimitive.Fallback)

const getSize = (radius: BorderRadius, theme: Theme, size: Size): number => {
  if (radius === "full") {
    switch (size) {
      case "sm":
        return 5 * theme.spacingBase
      case "md":
        return 6 * theme.spacingBase
      default:
        return 6 * theme.spacingBase
    }
  }
  switch (size) {
    case "sm":
      return 4 * theme.spacingBase
    case "md":
      return 5 * theme.spacingBase
    default:
      return 5 * theme.spacingBase
  }
}
