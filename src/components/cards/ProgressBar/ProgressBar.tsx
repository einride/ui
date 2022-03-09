import styled from "@emotion/styled"
import React, { forwardRef, HTMLAttributes } from "react"

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  totalSteps: number
  completedSteps: number
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ totalSteps, completedSteps, ...props }, ref) => {
    return (
      <StyledProgressBar
        {...props}
        ref={ref}
        role="progressbar"
        aria-valuenow={Math.floor((completedSteps / totalSteps) * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        {createSteps(totalSteps, completedSteps)}
      </StyledProgressBar>
    )
  },
)

const createSteps = (
  totalSteps: number,
  completedSteps: number,
): React.ReactElement[] => {
  return Array(totalSteps)
    .fill(0)
    .map((_, i) => {
      // eslint-disable-next-line react/no-array-index-key
      return <StyledProgressBarStep key={i} completed={i < completedSteps} />
    })
}

const StyledProgressBar = styled.div`
  display: flex;
  margin-left: 0 -2px;
`

const StyledProgressBarStep = styled.div<{ completed: boolean }>`
  background-color: ${({ theme, completed }) =>
    completed ? theme.colors.positive : theme.colors.background.tertiary};
  height: 8px;
  border-radius: 8px;
  margin: 0 2px;
  flex-grow: 1;
`
