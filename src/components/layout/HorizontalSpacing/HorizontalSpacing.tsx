import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes } from "react"

export interface HorizontalSpacingProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType
  /** Default value: "sm" */
  size?: Size
}

export const HorizontalSpacing = forwardRef<
  HTMLDivElement,
  HorizontalSpacingProps
>(({ size = "sm", ...props }, ref) => {
  return <StyledDiv size={size} {...props} ref={ref} />
})

const getWidth = (size?: Size): number => {
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
