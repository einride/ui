import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"
import { ContentColor } from "../../../lib/theme/types"

interface LinearVerticalProgressBaseProps extends HTMLAttributes<HTMLDivElement> {
  /** Color of the completed progress line. Default is `positive`. */
  color?: ContentColor

  /** Maximum value. Default is `100`. */
  max?: number

  /** Minimum value. Default is `0`. */
  min?: number

  /** Current value. */
  value: number
}

type LinearVerticalProgressProps = (
  | {
      /** Accessible name. */
      "aria-label": string
    }
  | {
      /** Accessible name. */
      "aria-labelledby": string
    }
) &
  LinearVerticalProgressBaseProps

/** Either `aria-label` or `aria-labelledby` is required for accessibility. */
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
        <Value max={max} min={min} textColor={color} value={value} />
      </Wrapper>
    )
  },
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.borderRadii.xs};
  inline-size: ${({ theme }) => 2 * theme.spacingBase}rem;
  block-size: ${({ theme }) => 8 * theme.spacingBase}rem;
`

interface ValueProps {
  max: number
  min: number
  textColor: ContentColor
  value: number
}

const Value = styled.div<ValueProps>`
  background: ${({ textColor, theme }) => theme.colors.content[textColor]};
  block-size: ${({ max, min, value }) => getBlockSize(max, min, value)}%;
  inline-size: 100%;
  border-radius: ${({ theme }) => theme.borderRadii.xs};
  transition-property: height;
  transition-duration: ${({ theme }) => theme.transitions.morph.duration};
  transition-timing-function: ${({ theme }) => theme.transitions.morph.timingFunction};
`

const getBlockSize = (max: number, min: number, value: number): number => {
  if (value > max) return 100
  if (value < min) return 0
  return ((value - min) / (max - min)) * 100
}
