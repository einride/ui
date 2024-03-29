import styled from "@emotion/styled"
import { ElementType, HTMLAttributes, forwardRef } from "react"
import { Theme } from "../../../lib/theme/types"

export interface VerticalSpacingProps extends HTMLAttributes<HTMLDivElement> {
  /** Rendered element. */
  as?: ElementType

  /** Size of spacing. Default is `sm`. */
  size?: Size
}

export const VerticalSpacing = forwardRef<HTMLDivElement, VerticalSpacingProps>(
  ({ size = "sm", ...props }, ref) => {
    return <StyledDiv size={size} {...props} ref={ref} />
  },
)

type Size = "xs" | "sm" | "md" | "lg" | "xl"

const StyledDiv = styled.div<{ size: Size }>`
  block-size: ${({ size, theme }) => getBlockSize(size, theme)}px;
`

const getBlockSize = (size: Size, theme: Theme): number => {
  switch (size) {
    case "xs":
      return theme.spacer
    case "sm":
      return 2 * theme.spacer
    case "md":
      return 3 * theme.spacer
    case "lg":
      return 6 * theme.spacer
    case "xl":
      return 8 * theme.spacer
    default:
      return 2 * theme.spacer
  }
}
