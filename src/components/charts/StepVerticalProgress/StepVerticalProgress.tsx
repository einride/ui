import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"
import { ContentColor } from "../../../lib/theme/types"

interface StepVerticalProgressBaseProps extends HTMLAttributes<HTMLDivElement> {
  color?: ContentColor
  completedSteps: number
  /**
   * Default: 5
   */
  steps?: number | undefined
}

export type StepVerticalProgressProps = (
  | { "aria-label": string }
  | { "aria-labelledby": string }
  | { title: string }
) &
  StepVerticalProgressBaseProps

/**
 * Either aria-label, aria-labelledby or title must be provided for accessibility.
 */
export const StepVerticalProgress = forwardRef<
  HTMLDivElement,
  StepVerticalProgressProps
>(({ color = "positive", completedSteps, steps = 5, ...props }, ref) => {
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
        <Step key={index} color={color} completed={index < completedSteps} />
      ))}
    </Wrapper>
  )
})

const Wrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: ${({ theme }) => theme.spacer}px;
  width: ${({ theme }) => 2 * theme.spacer}px;
`

const Step = styled.div<{ color: ContentColor; completed: boolean }>`
  background-color: ${({ color, completed, theme }) =>
    completed ? theme.colors.content[color] : theme.colors.background.tertiary};
  height: ${({ theme }) => 0.8 * theme.spacer}px;
  border-radius: ${({ theme }) => theme.spacer}px;
  transition: background-color 0.5s;
`
