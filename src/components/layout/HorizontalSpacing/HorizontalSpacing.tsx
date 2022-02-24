import styled from "@emotion/styled"
import { ElementType, HTMLAttributes } from "react"

export interface HorizontalSpacingProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType
  size?: Size
}

export const HorizontalSpacing = ({
  size = "sm",
  ...props
}: HorizontalSpacingProps) => {
  return <StyledDiv size={size} {...props} />
}

const getWidth = (size?: Size) => {
  switch (size) {
    case "sm":
      return 16
    case "lg":
      return 24
    default:
      return 16
  }
}

const StyledDiv = styled.div<HorizontalSpacingProps>`
  display: inline-block;
  background: var(--einride-ui-horizontal-spacing-background);
  width: ${({ size }) => getWidth(size)}px;
`

type Size = "sm" | "lg"
