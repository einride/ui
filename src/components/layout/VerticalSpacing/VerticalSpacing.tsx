import styled from "@emotion/styled"
import * as React from "react"
import { HTMLAttributes } from "react"

export interface VerticalSpacingProps extends HTMLAttributes<HTMLDivElement> {
  size?: Size
}

export const VerticalSpacing = ({
  size = "small",
  ...props
}: VerticalSpacingProps) => {
  return <StyledDiv size={size} {...props} />
}

const getHeight = (size?: Size) => {
  switch (size) {
    case "small":
      return 16
    case "medium":
      return 24
    case "large":
      return 72
    case "extraLarge":
      return 120
    default:
      return 16
  }
}

const StyledDiv = styled.div<VerticalSpacingProps>`
  background: var(--einride-ui-vertical-spacing-background);
  height: ${({ size }) => getHeight(size)}px;
`

type Size = "small" | "medium" | "large" | "extraLarge"
