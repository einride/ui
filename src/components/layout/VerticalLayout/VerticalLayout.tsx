import styled from "@emotion/styled"
import { ElementType, HTMLAttributes, ReactNode, forwardRef } from "react"
import { Theme } from "../../../lib/theme/types"

export interface VerticalLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** Rendered element. */
  as?: ElementType

  /** Content in layout. */
  children: ReactNode

  /**  Gap between children. Default is `sm`. */
  gap?: Gap
}

export const VerticalLayout = forwardRef<HTMLDivElement, VerticalLayoutProps>(
  ({ gap = "sm", ...props }, ref) => {
    return <StyledDiv gap={gap} {...props} ref={ref} />
  },
)

type Gap = "none" | "xs" | "sm" | "md" | "lg" | "xl"

const StyledDiv = styled.div<{ gap: Gap }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ gap, theme }) => getGap(gap, theme)}px;
`

const getGap = (gap: Gap, theme: Theme): number => {
  switch (gap) {
    case "none":
      return 0
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
