import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes, ReactNode } from "react"
import { primitives } from "../../../primitives/primitives"
import { Paragraph } from "../../typography/Paragraph/Paragraph"

export interface MapLabelProps extends Omit<HTMLAttributes<HTMLParagraphElement>, "color"> {
  children: ReactNode
}

export const MapLabel = forwardRef<HTMLParagraphElement, MapLabelProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledParagraph {...props} ref={ref}>
        {children}
      </StyledParagraph>
    )
  },
)

const StyledParagraph = styled(Paragraph)`
  display: inline-block;
  block-size: ${({ theme }) => 3 * theme.spacer}px;
  background: ${primitives.color.blue.dark};
  color: ${primitives.color.greyscale.white};
  border-radius: ${({ theme }) => theme.borderRadii.xs};
  padding-inline: 6px;
  padding-block-end: 1px;
  margin: 0;
`
