import isPropValid from "@emotion/is-prop-valid"
import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"
import { ContentColor, Font, Theme } from "../../../lib/theme/types"

export type LinkProps<C extends ElementType> = {
  /** Effective element used. */
  as?: C

  /** Link content. */
  children: ReactNode

  /** Text color of the link. */
  color?: Color

  /** Font styling. */
  font?: Font
} & ComponentPropsWithoutRef<C>

export const Link = <C extends ElementType>({
  children,
  color,
  font,
  ...props
}: LinkProps<C>): JSX.Element => {
  return (
    <StyledAnchor color={color} font={font} {...props}>
      {children}
    </StyledAnchor>
  )
}

type Color = Extract<ContentColor, "primary" | "secondary">

interface StyledAnchorProps {
  color: Color | undefined
  font: Font | undefined
}

const StyledAnchor = styled("a", {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "color", // avoid passing `color` attribute to HTML element
})<StyledAnchorProps>`
  color: ${({ color, theme }) => color && theme.colors.content[color]};
  font-family: ${({ font, theme }) => font && theme.fonts[font]};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  text-decoration: underline;

  &:hover:not([aria-disabled="true"]) {
    color: ${({ color, theme }) => getHoverColor(color, theme)};
    text-decoration: none;
  }

  &:active:not([aria-disabled="true"]) {
    text-decoration: underline;
  }
`

const getHoverColor = (color: ContentColor | undefined, theme: Theme): string => {
  switch (color) {
    case "primary":
      return theme.colors.content.secondary
    case "secondary":
      return theme.colors.content.primary
    default:
      return theme.colors.content.secondary
  }
}
