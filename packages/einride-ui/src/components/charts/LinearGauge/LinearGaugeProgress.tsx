import styled from "@emotion/styled"
import { ComponentPropsWithoutRef } from "react"
import { getColor } from "../../../lib/theme/prop-system"
import { Color } from "../../../lib/theme/props"

interface LinearGaugeProgressProps extends Omit<ComponentPropsWithoutRef<"svg">, "color"> {
  /** Stroke color. */
  color: Color

  /** Percentage of gauge completed. */
  percentage: number

  /** Radius of circular stroke. */
  responsiveRadius: number

  /** Width of stroke. */
  strokeWidth: number
}

export const LinearGaugeProgress = ({
  color,
  percentage,
  responsiveRadius,
  strokeWidth,
}: LinearGaugeProgressProps): JSX.Element => {
  return (
    <>
      <BackgroundCircle
        strokeWidth={strokeWidth}
        r={responsiveRadius}
        cx={responsiveRadius + strokeWidth / 2}
        cy={responsiveRadius + strokeWidth / 2}
      />
      <ProgressCircle
        textColor={color}
        percentage={percentage}
        strokeWidth={strokeWidth}
        r={responsiveRadius}
        cx={responsiveRadius + strokeWidth / 2}
        cy={responsiveRadius + strokeWidth / 2}
      />
    </>
  )
}

const TOP_GAP = -4
const CIRCLE_START_POINT_OFFSET = (360 * TOP_GAP) / 200 - 90

const BackgroundCircle = styled.circle<{ strokeWidth: number }>`
  fill: none;
  stroke: ${({ theme }) => theme.colors.background.tertiary};
  stroke-width: ${({ strokeWidth }) => strokeWidth};
  stroke-dasharray: 100, 100;
  stroke-dashoffset: ${TOP_GAP};
  stroke-linecap: round;
  transform: rotate(${CIRCLE_START_POINT_OFFSET}deg);
  transform-origin: center;
`

interface ProgressCircleProps {
  textColor: Color
  percentage: number
  strokeWidth: number
}

const ProgressCircle = styled.circle<ProgressCircleProps>`
  fill: none;
  stroke-dasharray: ${({ percentage }) =>
    `${percentage + TOP_GAP / 2 > 0 ? percentage + TOP_GAP / 2 : 0},${100}`};
  stroke-dashoffset: ${TOP_GAP};
  stroke-linecap: round;
  stroke: ${({ theme, textColor, percentage }) =>
    percentage > 0 ? getColor(textColor, theme) : "none"};
  stroke-width: ${({ strokeWidth }) => strokeWidth};
  transform: rotate(${CIRCLE_START_POINT_OFFSET}deg);
  transform-origin: center;
  transition-property: stroke-dasharray;
  transition-duration: ${({ theme }) => theme.transitions.morph.duration};
  transition-timing-function: ${({ theme }) => theme.transitions.morph.timingFunction};
`
