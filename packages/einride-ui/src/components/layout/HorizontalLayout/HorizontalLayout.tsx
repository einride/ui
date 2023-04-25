import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"
import { Theme } from "../../../lib/theme/types"

export interface HorizontalLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** Rendered element. */
  as?: ElementType

  /** Content in layout. */
  children: ReactNode

  /**  Gap between children. Default is `sm`. */
  gap?: Gap
}

export const HorizontalLayout = forwardRef<HTMLDivElement, HorizontalLayoutProps>(
  ({ gap = "sm", ...props }, ref) => {
    return <StyledDiv gap={gap} {...props} ref={ref} />
  },
)

type Gap = "none" | "sm" | "lg"

const StyledDiv = styled.div<{ gap: Gap }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: ${({ gap, theme }) => getGap(gap, theme)}px;
`

const getGap = (gap: Gap, theme: Theme): number => {
  switch (gap) {
    case "none":
      return 0
    case "sm":
      return 2 * theme.spacer
    case "lg":
      return 3 * theme.spacer
    default:
      return 2 * theme.spacer
  }
}
