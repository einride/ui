import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"

interface StepProgressBaseProps extends HTMLAttributes<HTMLDivElement> {
  completedSteps: number
  /**
   * Default: 4
   */
  steps?: number | undefined
}

export type StepProgressProps = (
  | { "aria-label": string }
  | { "aria-labelledby": string }
  | { title: string }
) &
  StepProgressBaseProps

/**
 * Either aria-label, aria-labelledby or title must be provided for accessibility.
 */

export const StepProgress = forwardRef<HTMLDivElement, StepProgressProps>(
  ({ completedSteps, steps = 4, ...props }, ref) => {
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
          <Step key={index} completed={index < completedSteps} />
        ))}
      </Wrapper>
    )
  },
)

const Wrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => 0.5 * theme.spacer}px;
`

const Step = styled.div<{ completed: boolean }>`
  background: ${({ theme, completed }) =>
    completed
      ? theme.colors.content.positive
      : theme.colors.background.tertiary};
  height: ${({ theme }) => theme.spacer}px;
  border-radius: ${({ theme }) => theme.spacer}px;
  flex-grow: 1;
`
