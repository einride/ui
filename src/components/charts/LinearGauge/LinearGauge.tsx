import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"
import { ContentColor } from "../../../lib/theme/types"
import { PointerIcon } from "../StepGauge/PointerIcon"
import { LinearGaugeProgress } from "./LinearGaugeProgress"

interface LinearGaugeBaseProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Default: positive
   */
  color?: ContentColor
  /**
   * Default: 0
   */
  min?: number
  /**
   * Default: 100
   */
  max?: number
  value: number
}

export type LinearGaugeProps = (
  | { "aria-label": string }
  | { "aria-labelledby": string }
  | { title: string }
) &
  LinearGaugeBaseProps

const STROKE_WIDTH = 1.8
const RESPONSIVE_RADIUS = 100 / (Math.PI * 2)
const VIEW_BOX_VALUE = RESPONSIVE_RADIUS * 2 + STROKE_WIDTH

/**
 * Either aria-label, aria-labelledby or title must be provided for accessibility.
 */
export const LinearGauge = forwardRef<HTMLDivElement, LinearGaugeProps>(
  ({ color = "positive", min = 0, max = 100, value, ...props }, ref) => {
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
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
`

const StyledPointerIcon = styled(PointerIcon)<{
  percentage: number
}>`
  /* Percentage based on pointer height divided by linear default height */
  height: ${(27 / 56) * 100}%;
  width: auto;
  transform: rotateZ(${({ percentage }) => getPointerRotation(percentage)}deg) translateY(-22%);
  transition: transform 0.5s ease-in-out;
  fill: ${({ theme }) => theme.colors.content.primary};
  position: absolute;
`

const getPointerRotation = (percentage: number): number => {
  const percentageToDegrees = (percentage / 100) * 360
  if (percentageToDegrees >= 360) return 360
  if (percentageToDegrees <= 0) return 0
  return percentageToDegrees
}
