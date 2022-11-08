import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import { getGap } from "../../../lib/theme/prop-system"
import { AlignItems, As, FlexWrap, Gap, JustifyContent } from "../../../lib/theme/props"

interface GroupProps extends ComponentPropsWithoutRef<"div"> {
  /** `align-items` CSS property. */
  alignItems?: AlignItems

  /** Effective element used. Default is `div`. */
  as?: As

  /** `flex-wrap` CSS property. Default is `wrap`. */
  flexWrap?: FlexWrap

  /**  Gap between children. Default is `md`. */
  gap?: Gap

  /** `justify-content` CSS property. Default is `start`. */
  justifyContent?: JustifyContent
}

export const Group = forwardRef<HTMLDivElement, GroupProps>(
  ({ flexWrap = "wrap", gap = "md", justifyContent = "start", ...props }, ref) => {
    return (
      <Wrapper flexWrap={flexWrap} gap={gap} justifyContent={justifyContent} {...props} ref={ref} />
    )
  },
)

interface WrapperProps {
  alignItems?: AlignItems
  flexWrap: FlexWrap
  gap: Gap
  justifyContent: JustifyContent
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  flex-wrap: ${({ flexWrap }) => flexWrap};
  gap: ${({ gap, theme }) => getGap(gap, theme)};
`
