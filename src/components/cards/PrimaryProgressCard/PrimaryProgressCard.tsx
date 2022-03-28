import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes, ReactNode } from "react"
import { StepProgress } from "../../charts/StepProgress/StepProgress"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { PrimaryCard } from "../PrimaryCard/PrimaryCard"

export interface PrimaryProgressCardProps
  extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  completedSteps: number
  isElevated?: boolean
  primaryText?: string
  secondaryText?: string
  /**
   * Default: 4
   */
  steps?: number
}

export const PrimaryProgressCard = forwardRef<
  HTMLDivElement,
  PrimaryProgressCardProps
>(
  (
    { children, completedSteps, primaryText, secondaryText, steps, ...props },
    ref,
  ) => {
    return (
      <PrimaryCard {...props} ref={ref}>
        {(primaryText || secondaryText) && (
          <Paragraphs>
            {primaryText && <Paragraph>{primaryText}</Paragraph>}
            {secondaryText && (
              <Paragraph color="secondary">{secondaryText}</Paragraph>
            )}
          </Paragraphs>
        )}
        {children}
        <StepProgress steps={steps} completedSteps={completedSteps} />
      </PrimaryCard>
    )
  },
)

const Paragraphs = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => 3 * theme.spacer}px;
`
