import styled from "@emotion/styled"
import { SVGAttributes } from "react"
import { ContentColor } from "../../../lib/theme/types"

export interface StepGaugeStepProps extends SVGAttributes<SVGSVGElement> {
  index: number
  completed: number
  color: ContentColor
  svgSize: number
  totalSteps: number
}

const RADIUS = 50

export const StepGaugeStep = ({
  index,
  completed,
  color,
  svgSize,
  totalSteps,
}: StepGaugeStepProps): JSX.Element => {
  const convertPolarCoordinatesToCartesian = (degree: number): number[] => {
    const center = svgSize / 2
    const radians = (degree * Math.PI) / 180.0
    return [
      center + RADIUS * Math.cos(radians),
      center + RADIUS * Math.sin(radians),
    ]
  }

  const calculatePathPoint = (degree: number): string => {
    return convertPolarCoordinatesToCartesian(degree)
      .map((n) => n.toPrecision(5))
      .join(",")
  }

  const createStepPath = (startOfStep: number, endOfStep: number): string => {
    const arc = Math.abs(startOfStep - endOfStep) > 180 ? 1 : 0
    return [
      `M${calculatePathPoint(startOfStep)}`,
      `A${RADIUS},${RADIUS},0,${arc},1,${calculatePathPoint(endOfStep)}`,
      `L${calculatePathPoint(endOfStep)}`,
      `A${RADIUS},${RADIUS},0,${arc},0,${calculatePathPoint(startOfStep)}`,
      "Z",
    ].join("")
  }

  const calculateStepData = (): { startOfStep: number; endOfStep: number } => {
    const gapBetweenSteps = 0.04 * totalSteps
    const adjustStepStartPointToGapSize =
      90 * (gapBetweenSteps / (totalSteps / 2))
    const lengthOfStep = 360 / totalSteps
    const startOfStep =
      lengthOfStep * index - (90 - adjustStepStartPointToGapSize)
    const endOfStep =
      lengthOfStep * (index + 1 - gapBetweenSteps) -
      (90 - adjustStepStartPointToGapSize)
    return { startOfStep, endOfStep }
  }

  const createStep = (): string => {
    const { startOfStep, endOfStep } = calculateStepData()
    return createStepPath(startOfStep, endOfStep)
  }

  return (
    <StyledPath
      d={createStep()}
      index={index}
      completed={completed}
      color={color}
      style={{
        vectorEffect: "non-scaling-stroke",
      }}
    />
  )
}

const StyledPath = styled.path<{
  index: number
  completed: number
  color: ContentColor
}>`
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: ${({ theme, index, completed, color }) =>
    index + 1 <= completed
      ? theme.colors.content[color]
      : theme.colors.background.tertiary};
  transition: fill 0.3s ease-in-out, stroke 0.3s ease-in-out;
  transition-delay: 0.3s;
`
