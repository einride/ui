import styled from "@emotion/styled"
import * as React from "react"
import { HTMLAttributes } from "react"

export interface HorizontalSpacingProps extends HTMLAttributes<HTMLDivElement> {
  size?: Size
}

export const HorizontalSpacing = ({
  size = "sm",
  ...props
}: HorizontalSpacingProps) => {
  return (
    <>
      a<StyledDiv size={size} {...props} />a
    </>
  )
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
  width: ${({ size }) => getWidth(size)}px;
`

type Size = "sm" | "lg"
