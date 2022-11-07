import isPropValid from "@emotion/is-prop-valid"
import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"
import { ContentColor } from "../../../lib/theme/types"

interface LinearProgressBaseProps extends HTMLAttributes<HTMLDivElement> {
  /** Color of the completed progress line. Default is `positive`. */
  color?: ContentColor

  /** Maximum value. Default is `100`. */
  max?: number

  /** Minimum value. Default is `0`. */
  min?: number

  /** Current value. */
  value: number
}

type LinearProgressProps = (
  | {
      /** Accessible name. */
      "aria-label": string
    }
  | {
      /** Accessible name. */
      "aria-labelledby": string
    }
) &
  LinearProgressBaseProps

/** Either `aria-label` or `aria-labelledby` is required for accessibility. */
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
  block-size: ${({ theme }) => theme.spacer}px;
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  position: relative;
  /* Needed to make sure component takes up full inline size in flex containers */
  inline-size: 100%;
`

interface ValueProps {
  color: ContentColor
  max: number
  min: number
  value: number
}

const Value = styled("div", {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "color", // avoid passing `color` attribute to HTML element
})<ValueProps>`
  background: ${({ color, theme }) => theme.colors.content[color]};
  block-size: ${({ theme }) => theme.spacer}px;
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
