import styled from "@emotion/styled"
import * as React from "react"
import { forwardRef, HTMLAttributes, ReactNode } from "react"

const StyledText = styled.small`
  font-size: 14px;
  font-weight: normal;
  line-height: 16px;
  margin-top: 3px;
  margin-bottom: 5px;
  padding: 0;
  color: ${({ theme }) => theme.colors.content.primary};
`

export interface CaptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
}

export const Caption = forwardRef<HTMLElement, CaptionProps>(
  ({ children, ...props }, ref) => {
    return (
      <p>
        <StyledText {...props} ref={ref}>
          {children}
        </StyledText>
      </p>
    )
  },
)
