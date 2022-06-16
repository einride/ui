import styled from "@emotion/styled"
import { forwardRef, HTMLAttributes, ReactNode } from "react"
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
  height: ${({ theme }) => 3 * theme.spacer}px;
  background: ${({ theme }) => theme.primitives.color.blue.dark};
  color: ${({ theme }) => theme.primitives.color.greyscale.white};
  border-radius: ${({ theme }) => theme.borderRadii.xs};
  padding: 0 6px 1px;
  margin: 0;
`
