import styled from "@emotion/styled"
import { HTMLAttributes, ReactNode } from "react"

export interface VerticalLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  size?: Size
}

export const VerticalLayout = ({
  size = "sm",
  ...props
}: VerticalLayoutProps) => {
  return <StyledDiv size={size} {...props} />
}
const getGap = (size?: Size) => {
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

const StyledDiv = styled.div<VerticalLayoutProps>`
  display: grid;
  grid-row-gap: ${({ size }) => getGap(size)}px;
`

type Size = "xs" | "sm" | "md" | "lg" | "xl"
