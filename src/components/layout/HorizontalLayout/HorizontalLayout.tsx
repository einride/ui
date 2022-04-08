import styled from "@emotion/styled"
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from "react"

export interface HorizontalLayoutProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType
  children: ReactNode
  /**  Default: "sm" */
  gap?: Gap
}

export const HorizontalLayout = forwardRef<
  HTMLDivElement,
  HorizontalLayoutProps
>(({ gap = "sm", ...props }, ref) => {
  return <StyledDiv gap={gap} {...props} ref={ref} />
})

type Gap = "none" | "sm" | "lg"

const StyledDiv = styled.div<{ gap: Gap }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  & > :not(:last-child) {
    margin-right: ${({ gap }) => getGap(gap)}px;
  }
`

const getGap = (gap?: Gap): number => {
  switch (gap) {
    case "none":
      return 0
    case "sm":
      return 16
    case "lg":
      return 24
    default:
      return 16
  }
}
