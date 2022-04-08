import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"

export interface VerticalLayoutProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType
  children: ReactNode
  /**  Default: "sm" */
  gap?: Gap
}

export const VerticalLayout = forwardRef<HTMLDivElement, VerticalLayoutProps>(
  ({ gap = "sm", ...props }, ref) => {
    return <StyledDiv gap={gap} {...props} ref={ref} />
  },
)

type Gap = "none" | "xs" | "sm" | "md" | "lg" | "xl"

const StyledDiv = styled.div<VerticalLayoutProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  & > :not(:last-child) {
    margin-bottom: ${({ gap }) => getGap(gap)}px;
  }
`

const getGap = (gap?: Gap): number => {
  switch (gap) {
    case "none":
      return 0
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
