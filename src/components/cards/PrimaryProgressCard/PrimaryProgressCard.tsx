import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes, ReactNode } from "react"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { PrimaryCard } from "../PrimaryCard/PrimaryCard"

export interface PrimaryProgressCardProps
  extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  isElevated?: boolean
  primaryText?: string
  progress: ReactNode
  secondaryText?: string
}

export const PrimaryProgressCard = forwardRef<
  HTMLDivElement,
  PrimaryProgressCardProps
>(({ children, primaryText, progress, secondaryText, ...props }, ref) => {
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
      {progress}
    </PrimaryCard>
  )
})

const Paragraphs = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => 3 * theme.spacer}px;
`
