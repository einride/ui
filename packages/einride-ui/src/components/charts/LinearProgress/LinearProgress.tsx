import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import { getColor } from "../../../lib/theme/prop-system"
import { Color } from "../../../lib/theme/props"
import { Box } from "../../layout/Box/Box"

export interface LinearProgressProps extends Omit<ComponentPropsWithoutRef<"div">, "color"> {
  /** Accessible name. Describes what information the progress is conveying. */
  "aria-label": string

  /** Color of the completed progress line. Default is `positive`. */
  color?: Color

  /** Maximum value. Default is `100`. */
  max?: number

  /** Minimum value. Default is `0`. */
  min?: number

  /** Current value. */
  value: number
}

/** A linear progress that can be used for conveying progress. */
export const LinearProgress = forwardRef<HTMLDivElement, LinearProgressProps>(
  ({ color = "positive", max = DEFAULT_MAX, min = DEFAULT_MIN, value, ...props }, ref) => {
    return (
      <Box
        background="tertiary"
        blockSize={1}
        borderRadius="sm"
        position="relative"
        inlineSize="100%"
        role="progressbar"
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        {...props}
        ref={ref}
      >
        <Value max={max} min={min} textColor={color} value={value} />
      </Box>
    )
  },
)

export const DEFAULT_MIN = 0
export const DEFAULT_MAX = 100

interface ValueProps {
  max: number
  min: number
  textColor: Color
  value: number
}

const Value = styled.div<ValueProps>`
  background: ${({ textColor, theme }) => getColor(textColor, theme)};
  block-size: ${({ theme }) => theme.spacingBase}rem;
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  inline-size: ${({ max, min, value }) => getInlineSize(max, min, value)}%;
  transition-property: width;
  transition-duration: ${({ theme }) => theme.transitions.morph.duration};
  transition-timing-function: ${({ theme }) => theme.transitions.morph.timingFunction};
`

const getInlineSize = (max: number, min: number, value: number): number => {
  if (value > max) return 100
  if (value < min) return 0
  return ((value - min) / (max - min)) * 100
}
