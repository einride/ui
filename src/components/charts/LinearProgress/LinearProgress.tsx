import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"
import { ContentColor } from "../../../lib/theme/types"

interface LinearProgressBaseProps extends HTMLAttributes<HTMLDivElement> {
  color?: ContentColor
  /**
   * Default: 100
   */
  max?: number
  /**
   * Default: 0
   */
  min?: number
  value: number
}

export type LinearProgressProps = (
  | { "aria-label": string }
  | { "aria-labelledby": string }
  | { title: string }
) &
  LinearProgressBaseProps

/**
 * Either aria-label, aria-labelledby or title must be provided for accessibility.
 */
export const LinearProgress = forwardRef<HTMLDivElement, LinearProgressProps>(
  ({ color = "positive", max = 100, min = 0, value, ...props }, ref) => {
    return (
      <Wrapper
        role="progressbar"
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        {...props}
        ref={ref}
      >
        <Value color={color} max={max} min={min} value={value} />
      </Wrapper>
    )
  },
)

const Wrapper = styled.div`
  background: ${({ theme }) => theme.colors.background.tertiary};
  height: ${({ theme }) => theme.spacer}px;
  border-radius: ${({ theme }) => theme.spacer}px;
  position: relative;
  /* Width needed to make sure component takes up full width in flex containers */
  width: 100%;
`

const Value = styled.div<{
  color: ContentColor
  max: number
  min: number
  value: number
}>`
  background: ${({ color, theme }) => theme.colors.content[color]};
  height: ${({ theme }) => theme.spacer}px;
  border-radius: ${({ theme }) => theme.spacer}px;
  width: ${({ max, min, value }) => getWidth(max, min, value)}%;
`

const getWidth = (max: number, min: number, value: number): number => {
  if (value > max) return 100
  if (value < min) return 0
  return ((value - min) / (max - min)) * 100
}
