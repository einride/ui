import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes } from "react"

export interface VerticalSpacingProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType
  /** Default: "sm" */
  size?: Size
}

export const VerticalSpacing = forwardRef<HTMLDivElement, VerticalSpacingProps>(
  ({ size = "sm", ...props }, ref) => {
    return <StyledDiv size={size} {...props} ref={ref} />
  },
)

const getHeight = (size?: Size): number => {
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
