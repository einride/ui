import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes } from "react"
import { Theme } from "../../../lib/theme/types"

export interface HorizontalSpacingProps extends HTMLAttributes<HTMLDivElement> {
  /** Rendered element. */
  as?: ElementType

  /** Size of spacing. Default is `sm`. */
  size?: Size
}

export const HorizontalSpacing = forwardRef<HTMLDivElement, HorizontalSpacingProps>(
  ({ size = "sm", ...props }, ref) => {
    return <StyledDiv size={size} {...props} ref={ref} />
  },
)

type Size = "sm" | "lg"

const StyledDiv = styled.div<{ size: Size }>`
  display: inline-block;
  inline-size: ${({ size, theme }) => getInlineSize(size, theme)}px;
`

const getInlineSize = (size: Size, theme: Theme): number => {
  switch (size) {
    case "sm":
      return 2 * theme.spacer
    case "lg":
      return 3 * theme.spacer
    default:
      return 2 * theme.spacer
  }
}
