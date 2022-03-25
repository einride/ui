import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"

export interface StepProgressProps extends HTMLAttributes<HTMLDivElement> {
  totalSteps: number
  completedSteps: number
}

export const StepProgress = forwardRef<HTMLDivElement, StepProgressProps>(
  ({ totalSteps, completedSteps, ...props }, ref) => {
    return (
      <Wrapper
        role="progressbar"
        aria-valuenow={completedSteps}
        aria-valuemin={0}
        aria-valuemax={totalSteps}
        {...props}
        ref={ref}
      >
        {Array.from(Array(totalSteps)).map((_, index) => (
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
    completed ? theme.colors.positive : theme.colors.background.tertiary};
  height: ${({ theme }) => theme.spacer}px;
  border-radius: ${({ theme }) => theme.spacer}px;
  flex-grow: 1;
`
