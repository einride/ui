import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import { isInArray } from "../../../lib/theme/guard"
import { AlignItems, As, Gap, JustifyContent, Width } from "../../../lib/theme/props"
import { spacings, Theme } from "../../../lib/theme/types"

interface StackProps extends ComponentPropsWithoutRef<"div"> {
  /** `align-items` CSS property. Default is `stretch`. */
  align?: AlignItems

  /** Effective element used. Default is `div`. */
  as?: As

  /**  Gap between children. Default is `sm`. */
  gap?: Gap

  /** `justify-content` CSS property. Default is `center`. */
  justify?: JustifyContent

  /** Width of the stack. */
  width?: Width
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ align = "stretch", gap = "md", justify = "center", ...props }, ref) => {
    return <Wrapper align={align} gap={gap} justify={justify} {...props} ref={ref} />
  },
)

interface WrapperProps {
  align: AlignItems
  gap: Gap
  justify: JustifyContent
  width?: Width
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
  gap: ${({ gap, theme }) => getGap(gap, theme)};
  width: ${({ theme, width }) => width && getWidth(theme, width)};
`

const getGap = (gap: Gap, theme: Theme): string => {
  if (typeof gap === "number") return `${gap * theme.spacingBase}rem`
  if (gap === "none") return "0px"
  if (isInArray(gap, spacings)) return theme.spacing[gap]
  return gap.toString()
}

const getWidth = (theme: Theme, width: Width): string => {
  if (typeof width === "number") return `${width * theme.spacer}px`
  if (isInArray(width, spacings)) return theme.spacing[width]
  return width.toString()
}
