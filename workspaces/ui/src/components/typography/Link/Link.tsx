import isPropValid from "@emotion/is-prop-valid"
import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"
import { getColor, getFont } from "../../../lib/theme/prop-system"
import { ContentColor, Font, Theme } from "../../../lib/theme/types"

type LinkProps<C extends ElementType> = {
  /** Effective element used. */
  as?: C

  /** Link content. */
  children: ReactNode

  /** Text color of the link. */
  color?: Extract<ContentColor, "primary" | "secondary">

  /** Font styling. */
  font?: Font
} & ComponentPropsWithoutRef<C>

export const Link = <C extends ElementType>({
  children,
  color,
  ...props
}: LinkProps<C>): JSX.Element => {
  return (
    <StyledAnchor textColor={color} {...props}>
      {children}
    </StyledAnchor>
  )
}

interface StyledAnchorProps {
  font?: Font
  textColor: Extract<ContentColor, "primary" | "secondary"> | undefined
}

const StyledAnchor = styled("a", {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "textColor", // avoid passing `textColor` attribute to HTML element
})<StyledAnchorProps>`
  color: ${({ textColor, theme }) => textColor && getColor(textColor, theme)};
  font-family: ${({ font, theme }) => font && getFont(font, theme)};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  text-decoration: underline;

  &:hover {
    color: ${({ textColor, theme }) => getHoverColor(textColor, theme)};
    text-decoration: none;
  }

  &:active {
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
