import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, forwardRef } from "react"
import { getColor } from "../../../lib/theme/prop-system"
import { Color } from "../../../lib/theme/props"
import { Box } from "../../layout/Box/Box"

export interface StepProgressProps extends Omit<ComponentPropsWithoutRef<"div">, "color"> {
  /** Accessible name. Describes what information the progress is conveying. */
  "aria-label": string

  /** Color of the completed steps. Default is `positive`. */
  color?: Color

  /** Number of completed steps. */
  completedSteps: number

  /** Number of steps. Default is `4`. */
  steps?: number | undefined
}

/** A progress par with steps that can be used for conveying step-based progress. */
export const StepProgress = forwardRef<HTMLDivElement, StepProgressProps>(
  ({ color = "positive", completedSteps, steps = DEFAULT_STEPS, ...props }, ref) => {
    return (
      <Box
        display="flex"
        gap={0.5}
        inlineSize="100%"
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
      </Box>
    )
  },
)

export const DEFAULT_STEPS = 4

interface StepProps {
  completed: boolean
  textColor: Color
}

const Step = styled.div<StepProps>`
  background: ${({ completed, textColor, theme }) =>
    completed ? getColor(textColor, theme) : theme.colors.background.tertiary};
  block-size: ${({ theme }) => theme.spacingBase}rem;
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  flex-grow: 1;
  transition-property: background;
  transition-duration: ${({ theme }) => theme.transitions.morph.duration};
  transition-timing-function: ${({ theme }) => theme.transitions.morph.timingFunction};
`
