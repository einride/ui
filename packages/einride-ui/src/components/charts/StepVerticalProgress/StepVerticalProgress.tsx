import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"
import { ContentColor } from "@einride/core"

interface StepVerticalProgressBaseProps extends HTMLAttributes<HTMLDivElement> {
  /** Color of the completed steps. Default is `positive`. */
  color?: ContentColor

  /** Number of completed steps. */
  completedSteps: number

  /** Number of steps. Default is `5`. */
  steps?: number | undefined
}

type StepVerticalProgressProps = (
  | {
      /** Accessible name. */
      "aria-label": string
    }
  | {
      /** Accessible name. */
      "aria-labelledby": string
    }
) &
  StepVerticalProgressBaseProps

/** Either `aria-label` or `aria-labelledby` is required for accessibility. */
export const StepVerticalProgress = forwardRef<HTMLDivElement, StepVerticalProgressProps>(
  ({ color = "positive", completedSteps, steps = 5, ...props }, ref) => {
    return (
      <Wrapper
        role="progressbar"
        aria-valuemax={steps}
        aria-valuemin={0}
        aria-valuenow={completedSteps}
        aria-valuetext={`${completedSteps} of ${steps} steps completed`}
        {...props}
        ref={ref}
      >
        {Array.from(Array(steps)).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Step key={index} completed={index < completedSteps} textColor={color} />
        ))}
      </Wrapper>
    )
  },
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: ${({ theme }) => theme.spacingBase}rem;
  inline-size: ${({ theme }) => 2 * theme.spacingBase}rem;
`

interface StepProps {
  completed: boolean
  textColor: ContentColor
}

const Step = styled.div<StepProps>`
  background: ${({ completed, textColor, theme }) =>
    completed ? theme.colors.content[textColor] : theme.colors.background.tertiary};
  block-size: ${({ theme }) => 0.8 * theme.spacingBase}rem;
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  transition-property: background;
  transition-duration: ${({ theme }) => theme.transitions.morph.duration};
  transition-timing-function: ${({ theme }) => theme.transitions.morph.timingFunction};
`
