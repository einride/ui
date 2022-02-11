import styled from "@emotion/styled"
import { HTMLAttributes } from "react"

export interface VerticalSpacingProps extends HTMLAttributes<HTMLDivElement> {
  size?: Size
}

export const VerticalSpacing = ({
  size = "sm",
  ...props
}: VerticalSpacingProps) => {
  return <StyledDiv size={size} {...props} />
}

const getHeight = (size?: Size) => {
  switch (size) {
    case "xs":
      return 8
    case "sm":
      return 16
    case "md":
      return 24
    case "lg":
      return 48
    case "xl":
      return 64
    default:
      return 16
  }
}

const StyledDiv = styled.div<VerticalSpacingProps>`
  background: var(--einride-ui-vertical-spacing-background);
  height: ${({ size }) => getHeight(size)}px;
`

type Size = "xs" | "sm" | "md" | "lg" | "xl"
