import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import { isInArray } from "../../../lib/theme/guard"
import { AlignItems, As, Gap, Height, JustifyContent, Width } from "../../../lib/theme/props"
import { spacings, Theme } from "../../../lib/theme/types"

interface StackProps extends ComponentPropsWithoutRef<"div"> {
  /** `align-items` CSS property. Default is `stretch`. */
  alignItems?: AlignItems

  /** Effective element used. Default is `div`. */
  as?: As

  /**  Gap between children. Default is `sm`. */
  gap?: Gap

  /** `height` CSS property. */
  height?: Height

  /** `justify-content` CSS property. Default is `center`. */
  justifyContent?: JustifyContent

  /** Width of the stack. */
  width?: Width
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ alignItems = "stretch", gap = "md", justifyContent = "center", ...props }, ref) => {
    return (
      <Wrapper
        alignItems={alignItems}
        gap={gap}
        justifyContent={justifyContent}
        {...props}
        ref={ref}
      />
    )
  },
)

interface WrapperProps {
  alignItems: AlignItems
  gap: Gap
  height?: Height
  justifyContent: JustifyContent
  width?: Width
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  gap: ${({ gap, theme }) => getGap(gap, theme)};
  height: ${({ height, theme }) => height && getHeight(height, theme)};
  width: ${({ theme, width }) => width && getWidth(theme, width)};
`

const getGap = (gap: Gap, theme: Theme): string => {
  if (typeof gap === "number") return `${gap * theme.spacingBase}rem`
  if (gap === "none") return "0px"
  if (isInArray(gap, spacings)) return theme.spacing[gap]
  return gap.toString()
}

const getHeight = (height: Height, theme: Theme): string => {
  if (typeof height === "number") return `${height * theme.spacingBase}rem`
  if (isInArray(height, spacings)) return theme.spacing[height]
  return height.toString()
}

const getWidth = (theme: Theme, width: Width): string => {
  if (typeof width === "number") return `${width * theme.spacingBase}rem`
  if (isInArray(width, spacings)) return theme.spacing[width]
  return width.toString()
}
