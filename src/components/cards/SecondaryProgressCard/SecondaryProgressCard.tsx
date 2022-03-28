import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes, ReactNode } from "react"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { SecondaryCard } from "../SecondaryCard/SecondaryCard"

export interface SecondaryProgressCardProps
  extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  isElevated?: boolean
  primaryText?: string
  progress: ReactNode
  secondaryText?: string
}

export const SecondaryProgressCard = forwardRef<
  HTMLDivElement,
  SecondaryProgressCardProps
>(({ children, primaryText, progress, secondaryText, ...props }, ref) => {
  return (
    <SecondaryCard {...props} ref={ref}>
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
    </SecondaryCard>
  )
})

const Paragraphs = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => 3 * theme.spacer}px;
`
