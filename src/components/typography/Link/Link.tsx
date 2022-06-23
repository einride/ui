import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"
import { ContentColor, Font } from "../../../lib/theme/types"

export type LinkProps<C extends ElementType> = {
  as?: C
  children: ReactNode
  color?: ContentColor
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

const StyledAnchor = styled.a<{ color: ContentColor; font: Font }>`
  color: ${({ color, theme }) => theme.colors.content[color]};
  font-family: ${({ font, theme }) => theme.fonts[font]};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`
