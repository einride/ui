import isPropValid from "@emotion/is-prop-valid"
import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes } from "react"
import { ContentColor } from "../../../lib/theme/types"

interface StepProgressBaseProps extends HTMLAttributes<HTMLDivElement> {
  /** Color of the completed steps. Default is `positive`. */
  color?: ContentColor

  /** Number of completed steps. */
  completedSteps: number

  /** Number of steps. Default is `4`. */
  steps?: number | undefined
}

export type StepProgressProps = (
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
          <Step key={index} color={color} completed={index < completedSteps} />
        ))}
      </Wrapper>
    )
  },
)

const Wrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => 0.5 * theme.spacer}px;
  /* Width needed to make sure component takes up full width in flex containers */
  width: 100%;
`

interface StepProps {
  color: ContentColor
  completed: boolean
}

const Step = styled("div", {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== "color", // avoid passing `color` attribute to HTML element
})<StepProps>`
  background: ${({ color, completed, theme }) =>
    completed ? theme.colors.content[color] : theme.colors.background.tertiary};
  height: ${({ theme }) => theme.spacer}px;
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  flex-grow: 1;
  transition-property: background;
  transition-duration: ${({ theme }) => theme.transitions.morph.duration};
  transition-timing-function: ${({ theme }) => theme.transitions.morph.timingFunction};
`
