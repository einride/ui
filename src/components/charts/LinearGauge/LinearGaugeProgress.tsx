import styled from "@emotion/styled"
import { SVGAttributes } from "react"
import { ContentColor } from "../../../lib/theme/types"

export interface LinearGaugeProgressProps extends SVGAttributes<SVGSVGElement> {
  color: ContentColor
  percentage: number
  responsiveRadius: number
  strokeWidth: number
}

const TOP_GAP = -4
const CIRCLE_START_POINT_OFFSET = (360 * TOP_GAP) / 200 - 90

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
        color={color}
        percentage={percentage}
        strokeWidth={strokeWidth}
        r={responsiveRadius}
        cx={responsiveRadius + strokeWidth / 2}
        cy={responsiveRadius + strokeWidth / 2}
      />
    </>
  )
}

const BackgroundCircle = styled.circle<{
  strokeWidth: number
}>`
  fill: none;
  stroke: ${({ theme }) => theme.colors.background.tertiary};
  stroke-width: ${({ strokeWidth }) => strokeWidth};
  stroke-dasharray: 100, 100;
  stroke-dashoffset: ${TOP_GAP};
  transform: rotate(${CIRCLE_START_POINT_OFFSET}deg);
  transform-origin: center;
`

const ProgressCircle = styled.circle<{
  color: ContentColor
  percentage: number
  strokeWidth: number
}>`
  fill: none;
  stroke-dasharray: ${({ percentage }) =>
    `${percentage + TOP_GAP / 2 > 0 ? percentage + TOP_GAP / 2 : 0},${100}`};
  stroke-dashoffset: ${TOP_GAP};
  stroke-linecap: round;
  stroke: ${({ theme, color, percentage }) =>
    percentage > 0 ? theme.colors.content[color] : "none"};
  stroke-width: ${({ strokeWidth }) => strokeWidth};
  transition: stroke-dasharray 0.5s ease-in-out;
  transform: rotate(${CIRCLE_START_POINT_OFFSET}deg);
  transform-origin: center;
`
