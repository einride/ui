import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"
import { ContentColor } from "../../../lib/theme/types"

interface LinearVerticalProgressBaseProps extends HTMLAttributes<HTMLDivElement> {
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

export type LinearVerticalProgressProps = (
  | { "aria-label": string }
  | { "aria-labelledby": string }
  | { title: string }
) &
  LinearVerticalProgressBaseProps

/**
 * Either aria-label, aria-labelledby or title must be provided for accessibility.
 */
export const LinearVerticalProgress = forwardRef<HTMLDivElement, LinearVerticalProgressProps>(
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
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadii.xs};
  width: ${({ theme }) => 2 * theme.spacer}px;
  height: ${({ theme }) => 8 * theme.spacer}px;
`

const Value = styled.div<{
  color: ContentColor
  max: number
  min: number
  value: number
}>`
  background-color: ${({ theme, color }) => theme.colors.content[color]};
  height: ${({ max, min, value }) => getHeight(max, min, value)}%;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadii.xs};
  transition: height 0.5s;
`

const getHeight = (max: number, min: number, value: number): number => {
  if (value > max) return 100
  if (value < min) return 0
  return ((value - min) / (max - min)) * 100
}
