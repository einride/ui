import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"
import { Theme } from "../../../lib/theme/theme"
import { ContentColor, Font } from "../../../lib/theme/types"

export type LinkProps<C extends ElementType> = {
  as?: C
  children: ReactNode
  color?: Color
  font?: Font
} & ComponentPropsWithoutRef<C>

export const Link = <C extends ElementType>({
  children,
  color = "primary",
  font = "body",
  ...props
}: LinkProps<C>): JSX.Element => {
  return (
    <StyledAnchor color={color} font={font} {...props}>
      {children}
    </StyledAnchor>
  )
}

type Color = Extract<ContentColor, "primary" | "secondary">

const StyledAnchor = styled.a<{ color: Color; font: Font }>`
  color: ${({ color, theme }) => theme.colors.content[color]};
  font-family: ${({ font, theme }) => theme.fonts[font]};
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

const getHoverColor = (color: ContentColor, theme: Theme): string => {
  switch (color) {
    case "primary":
      return theme.colors.content.secondary
    case "secondary":
      return theme.colors.content.primary
    default:
      return theme.colors.content.secondary
  }
}
