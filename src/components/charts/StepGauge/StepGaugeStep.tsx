import styled from "@emotion/styled"
import { SVGAttributes } from "react"
import { ContentColor } from "../../../lib/theme/types"

export interface StepGaugeStepProps extends SVGAttributes<SVGSVGElement> {
  /** Color of the completed gauge stroke.  */
  color: ContentColor

  /** Number of completed steps. */
  completedSteps: number

  /** Current step index. */
  index: number

  /** Number of steps. */
  steps: number

  /** Size of SVG. */
  svgSize: number
}

const RADIUS = 50

export const StepGaugeStep = ({
  color,
  completedSteps,
  index,
  steps,
  svgSize,
}: StepGaugeStepProps): JSX.Element => {
  const convertPolarCoordinatesToCartesian = (degree: number): number[] => {
    const center = svgSize / 2
    const radians = (degree * Math.PI) / 180.0
    return [center + RADIUS * Math.cos(radians), center + RADIUS * Math.sin(radians)]
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
    const gapBetweenSteps = 0.04 * steps
    const adjustStepStartPointToGapSize = 90 * (gapBetweenSteps / (steps / 2))
    const lengthOfStep = 360 / steps
    const startOfStep = lengthOfStep * index - (90 - adjustStepStartPointToGapSize)
    const endOfStep =
      lengthOfStep * (index + 1 - gapBetweenSteps) - (90 - adjustStepStartPointToGapSize)
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
      completed={completedSteps}
      color={color}
      style={{
        vectorEffect: "non-scaling-stroke",
      }}
    />
  )
}

const StyledPath = styled.path<{ index: number; completed: number; color: ContentColor }>`
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: ${({ theme, index, completed, color }) =>
    index + 1 <= completed ? theme.colors.content[color] : theme.colors.background.tertiary};
  transition-property: fill, stroke;
  transition-duration: ${({ theme }) => theme.transitions.morph.duration};
  transition-timing-function: ${({ theme }) => theme.transitions.morph.timingFunction};
`
