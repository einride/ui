import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"
import { ContentColor } from "../../../lib/theme/types"
import { PointerIcon } from "./PointerIcon"
import { StepGaugeStep } from "./StepGaugeStep"

interface StepGaugeBaseProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Default: positive
   */
  color?: ContentColor
  completed: number
  steps: number
  /**
   * Default: 3
   */
  strokeWidth?: number
}

export type StepGaugeProps = (
  | { "aria-label": string }
  | { "aria-labelledby": string }
  | { title: string }
) &
  StepGaugeBaseProps

/**
 * Either aria-label, aria-labelledby or title must be provided for accessibility.
 */
export const StepGauge = forwardRef<HTMLDivElement, StepGaugeProps>(
  (
    { color = "positive", completed, steps, strokeWidth = 3, ...props },
    ref,
  ) => {
    const svgSize = 100 + strokeWidth * 2

    return (
      <Wrapper
        {...props}
        ref={ref}
        role="progressbar"
        aria-valuemax={steps}
        aria-valuemin={0}
        aria-valuenow={completed}
        aria-valuetext={`${completed} of ${steps} steps completed`}
      >
        <StyledSvg
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          strokeWidth={strokeWidth}
        >
          {[...Array(steps).keys()].map((step) => (
            <StepGaugeStep
              key={step}
              index={step}
              completed={completed}
              color={color}
              svgSize={svgSize}
              totalSteps={steps}
            />
          ))}
        </StyledSvg>

        <StyledPointerIcon completed={completed} steps={steps} />
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

const StyledSvg = styled.svg<{ strokeWidth: number }>`
  stroke-width: ${({ strokeWidth }) => strokeWidth};
  width: 100%;
`

const StyledPointerIcon = styled(PointerIcon)<{
  completed: number
  steps: number
}>`
  /* Percentage based on pointer viewBox height divided by StepGauge viewBox height  */
  height: ${(27 / 56) * 100}%;
  width: auto;
  transform: rotateZ(
      ${({ completed, steps }) => getPointerRotation(completed, steps)}deg
    )
    translateY(-22%);
  transition: transform 0.5s ease-in-out;
  fill: ${({ theme }) => theme.colors.content.primary};
  position: absolute;
`

const getPointerRotation = (completed: number, steps: number): number => {
  if (completed > steps) return 360
  if (completed < 0) return 0
  return (360 / steps) * completed
}
