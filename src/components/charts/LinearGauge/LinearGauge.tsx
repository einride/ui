import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"
import { ContentColor } from "../../../lib/theme/types"
import { PointerIcon } from "../StepGauge/PointerIcon"
import { LinearGaugeProgress } from "./LinearGaugeProgress"

interface LinearGaugeBaseProps extends HTMLAttributes<HTMLDivElement> {
  /** Color of the completed gauge stroke. Default is `positive`. */
  color?: ContentColor

  /** Maximum value. Default is `100`. */
  max?: number

  /** Minimum value. Default is `0`. */
  min?: number

  /** Current value. */
  value: number
}

export type LinearGaugeProps = (
  | {
      /** Accessible name. */
      "aria-label": string
    }
  | {
      /** Accessible name. */
      "aria-labelledby": string
    }
) &
  LinearGaugeBaseProps

const STROKE_WIDTH = 1.8
const RESPONSIVE_RADIUS = 100 / (Math.PI * 2)
const VIEW_BOX_VALUE = RESPONSIVE_RADIUS * 2 + STROKE_WIDTH

/** Either `aria-label` or `aria-labelledby` is required for accessibility. */
export const LinearGauge = forwardRef<HTMLDivElement, LinearGaugeProps>(
  ({ color = "positive", max = 100, min = 0, value, ...props }, ref) => {
    const percentage = ((value - min) / (max - min)) * 100

    return (
      <Wrapper
        {...props}
        ref={ref}
        role="progressbar"
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
      >
        <StyledSvg viewBox={`0 0 ${VIEW_BOX_VALUE} ${VIEW_BOX_VALUE}`}>
          <LinearGaugeProgress
            color={color}
            percentage={percentage}
            strokeWidth={STROKE_WIDTH}
            responsiveRadius={RESPONSIVE_RADIUS}
          />
        </StyledSvg>
        <StyledPointerIcon percentage={percentage} />
      </Wrapper>
    )
  },
)

const Wrapper = styled.div`
  position: relative;
  inline-size: ${({ theme }) => 7 * theme.spacer}px;
  block-size: ${({ theme }) => 7 * theme.spacer}px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`

const StyledSvg = styled.svg`
  inline-size: 100%;
  block-size: 100%;
`

const StyledPointerIcon = styled(PointerIcon)<{ percentage: number }>`
  /* Percentage based on pointer height divided by linear default height */
  block-size: ${(27 / 56) * 100}%;
  inline-size: auto;
  transform: rotateZ(${({ percentage }) => getPointerRotation(percentage)}deg) translateY(-22%);
  transition-property: transform;
  transition-duration: ${({ theme }) => theme.transitions.morph.duration};
  transition-timing-function: ${({ theme }) => theme.transitions.morph.timingFunction};
  fill: ${({ theme }) => theme.colors.content.primary};
  position: absolute;
`

const getPointerRotation = (percentage: number): number => {
  const percentageToDegrees = (percentage / 100) * 360
  if (percentageToDegrees >= 360) return 360
  if (percentageToDegrees <= 0) return 0
  return percentageToDegrees
}
