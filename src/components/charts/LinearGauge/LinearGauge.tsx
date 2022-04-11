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

/**
 * Either aria-label, aria-labelledby or title must be provided for accessibility.
 */
export const LinearGauge = forwardRef<HTMLDivElement, LinearGaugeProps>(
  ({ color = "positive", min = 0, max = 100, value, ...props }, ref) => {
    const percentage = ((value - min) / (max - min)) * 100
    const strokeWidth = 1.8

    const responsiveRadius = 100 / (Math.PI * 2)
    const viewBoxValue = responsiveRadius * 2 + strokeWidth

    return (
      <Wrapper
        {...props}
        ref={ref}
        role="progressbar"
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
      >
        <StyledSvg viewBox={`0 0 ${viewBoxValue} ${viewBoxValue}`}>
          <LinearGaugeProgress
            color={color}
            percentage={percentage}
            strokeWidth={strokeWidth}
            responsiveRadius={responsiveRadius}
          />
        </StyledSvg>

        <StyledPointerIcon
          percentage={percentage}
          strokeWidth={strokeWidth}
          viewBoxValue={viewBoxValue}
        />
      </Wrapper>
    )
  },
)

const Wrapper = styled.div`
  position: relative;
  width: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledSvg = styled.svg`
  width: 100%;
  height: 100%;
`

const StyledPointerIcon = styled(PointerIcon)<{
  percentage: number
  viewBoxValue: number
}>`
  /* Percentage based on pointer height divided by linear default height */
  height: ${(27 / 56) * 100}%;
  width: auto;
  transform: rotateZ(${({ percentage }) => getPointerRotation(percentage)}deg)
    translateY(-22%);
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
