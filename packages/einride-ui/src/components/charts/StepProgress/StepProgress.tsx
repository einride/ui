import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"
import { ContentColor } from "@einride/core"

interface StepProgressBaseProps extends HTMLAttributes<HTMLDivElement> {
  /** Color of the completed steps. Default is `positive`. */
  color?: ContentColor

  /** Number of completed steps. */
  completedSteps: number

  /** Number of steps. Default is `4`. */
  steps?: number | undefined
}

type StepProgressProps = (
  | {
      /** Accessible name. */
      "aria-label": string
    }
  | {
      /** Accessible name. */
      "aria-labelledby": string
    }
) &
  StepProgressBaseProps

/** Either `aria-label` or `aria-labelledby` is required for accessibility. */
export const StepProgress = forwardRef<HTMLDivElement, StepProgressProps>(
  ({ color = "positive", completedSteps, steps = 4, ...props }, ref) => {
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
  gap: ${({ theme }) => 0.5 * theme.spacingBase}rem;
  /* Needed to make sure component takes up full inline size in flex containers */
  inline-size: 100%;
`

interface StepProps {
  completed: boolean
  textColor: ContentColor
}

const Step = styled.div<StepProps>`
  background: ${({ completed, textColor, theme }) =>
    completed ? theme.colors.content[textColor] : theme.colors.background.tertiary};
  block-size: ${({ theme }) => theme.spacingBase}rem;
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  flex-grow: 1;
  transition-property: background;
  transition-duration: ${({ theme }) => theme.transitions.morph.duration};
  transition-timing-function: ${({ theme }) => theme.transitions.morph.timingFunction};
`
