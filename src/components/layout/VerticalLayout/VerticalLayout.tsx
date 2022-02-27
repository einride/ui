import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"

export interface VerticalLayoutProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType
  children: ReactNode
  size?: Size
}

export const VerticalLayout = forwardRef<HTMLDivElement, VerticalLayoutProps>(
  ({ size = "sm", ...props }, ref) => {
    return <StyledDiv size={size} {...props} ref={ref} />
  },
)

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
