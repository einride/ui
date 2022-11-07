import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"
import { ContentColor } from "../../../lib/theme/types"
import { PointerIcon } from "./PointerIcon"
import { StepGaugeStep } from "./StepGaugeStep"

interface StepGaugeBaseProps extends HTMLAttributes<HTMLDivElement> {
  /** Color of the completed gauge stroke. Default is `positive`. */
  color?: ContentColor

  /** Number of completed steps. */
  // TODO: Rename to `completedSteps` in next major.
  completed: number

  /** Number of steps. Default is `3`. */
  steps: number

  /** Width of stroke. Default is `3`. */
  strokeWidth?: number
}

type StepGaugeProps = (
  | {
      /** Accessible name. */
      "aria-label": string
    }
  | {
      /** Accessible name. */
      "aria-labelledby": string
    }
) &
  StepGaugeBaseProps

/** Either `aria-label` or `aria-labelledby` is required for accessibility. */
export const StepGauge = forwardRef<HTMLDivElement, StepGaugeProps>(
  ({ color = "positive", completed, steps = 3, strokeWidth = 3, ...props }, ref) => {
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
        <StyledSvg viewBox={`0 0 ${svgSize} ${svgSize}`} strokeWidth={strokeWidth}>
          {[...Array(steps).keys()].map((step) => (
            <StepGaugeStep
              key={step}
              completedSteps={completed}
              color={color}
              index={step}
              steps={steps}
              svgSize={svgSize}
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
  inline-size: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledSvg = styled.svg<{ strokeWidth: number }>`
  stroke-width: ${({ strokeWidth }) => strokeWidth};
  inline-size: 100%;
`

const StyledPointerIcon = styled(PointerIcon)<{ completed: number; steps: number }>`
  /* Percentage based on pointer viewBox height divided by StepGauge viewBox height  */
  block-size: ${(27 / 56) * 100}%;
  inline-size: auto;
  transform: rotateZ(${({ completed, steps }) => getPointerRotation(completed, steps)}deg)
    translateY(-22%);
  transition-property: transform;
  transition-duration: ${({ theme }) => theme.transitions.morph.duration};
  transition-timing-function: ${({ theme }) => theme.transitions.morph.timingFunction};
  fill: ${({ theme }) => theme.colors.content.primary};
  position: absolute;
`

const getPointerRotation = (completed: number, steps: number): number => {
  if (completed > steps) return 360
  if (completed < 0) return 0
  return (360 / steps) * completed
}
