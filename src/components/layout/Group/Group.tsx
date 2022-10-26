import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import { isInArray } from "../../../lib/theme/guard"
import { AlignItems, As, FlexWrap, Gap, JustifyContent } from "../../../lib/theme/props"
import { spacings, Theme } from "../../../lib/theme/types"

interface GroupProps extends ComponentPropsWithoutRef<"div"> {
  /** `align-items` CSS property. */
  align?: AlignItems

  /** Effective element used. Default is `div`. */
  as?: As

  /** `flex-wrap` CSS property. Default is `wrap`. */
  flexWrap?: FlexWrap

  /**  Gap between children. Default is `md`. */
  gap?: Gap

  /** `justify-content` CSS property. Default is `start`. */
  justify?: JustifyContent
}

export const Group = forwardRef<HTMLDivElement, GroupProps>(
  ({ flexWrap = "wrap", gap = "md", justify = "start", ...props }, ref) => {
    return <Wrapper flexWrap={flexWrap} gap={gap} justify={justify} {...props} ref={ref} />
  },
)

interface WrapperProps {
  align?: AlignItems
  flexWrap: FlexWrap
  gap: Gap
  justify: JustifyContent
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  gap: ${({ gap, theme }) => getGap(gap, theme)};
`

const getGap = (gap: Gap, theme: Theme): string => {
  if (typeof gap === "number") return `${gap * theme.spacingBase}rem`
  if (gap === "none") return "0px"
  if (isInArray(gap, spacings)) return theme.spacing[gap]
  return gap.toString()
}
