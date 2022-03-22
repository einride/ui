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

const getGap = (gap?: Gap) => {
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

const StyledDiv = styled.div<{ gap: Gap }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  & > :not(:last-child) {
    margin-right: ${({ gap }) => getGap(gap)}px;
  }
`

type Gap = "none" | "sm" | "lg"
