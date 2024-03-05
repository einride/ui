import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import { Color } from "../../../lib/theme/props"
import { Box } from "../../layout/Box/Box"
import { PointerIcon } from "../StepGauge/PointerIcon"
import { LinearGaugeProgress } from "./LinearGaugeProgress"

export interface LinearGaugeProps extends Omit<ComponentPropsWithoutRef<"div">, "color"> {
  /** Accessible name. Describes what information the gauge is conveying. */
  "aria-label": string

  /** Color of the completed gauge stroke. Default is `positive`. */
  color?: Color

  /** Maximum value. Default is `100`. */
  max?: number

  /** Minimum value. Default is `0`. */
  min?: number

  /** Current value. */
  value: number
}

/** A linear gauge that can be used for conveying progress or status in a range. */
export const LinearGauge = forwardRef<HTMLDivElement, LinearGaugeProps>(
  ({ color = "positive", max = DEFAULT_MAX, min = DEFAULT_MIN, value, ...props }, ref) => {
    const percentage = ((value - min) / (max - min)) * 100

    return (
      <Box
        position="relative"
        inlineSize={7}
        blockSize={7}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexShrink={0}
        role="progressbar"
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        {...props}
        ref={ref}
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
      </Box>
    )
  },
)

export const DEFAULT_MIN = 0
export const DEFAULT_MAX = 100
const STROKE_WIDTH = 1.8
const RESPONSIVE_RADIUS = 100 / (Math.PI * 2)
const VIEW_BOX_VALUE = RESPONSIVE_RADIUS * 2 + STROKE_WIDTH

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
