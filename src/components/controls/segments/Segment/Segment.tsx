import styled from "@emotion/styled"
import { ButtonHTMLAttributes, ElementType, forwardRef, ReactNode } from "react"

export interface SegmentProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  as?: ElementType
  children: ReactNode
  onClick: () => void
  selected?: boolean
}

export const Segment = forwardRef<HTMLButtonElement, SegmentProps>(
  ({ children, selected, ...props }, ref) => {
    return (
      <Wrapper
        aria-selected={selected ? "true" : undefined}
        role="tab"
        {...props}
        ref={ref}
      >
        {children}
      </Wrapper>
    )
  },
)

const Wrapper = styled.button`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  color: ${({ theme }) => theme.colors.content.secondary};
  padding-top: ${({ theme }) => theme.spacer + 1}px;
  padding-bottom: ${({ theme }) => 2 * theme.spacer - 1}px;
  box-shadow: inset 0 -1px 0 ${({ theme }) => theme.colors.border.primary};
  margin-bottom: ${({ theme }) => 3 * theme.spacer}px;

  &[aria-selected],
  &:hover {
    color: ${({ theme }) => theme.colors.content.primary};
    box-shadow: inset 0 -1px 0 ${({ theme }) => theme.colors.border.selected};
  }

  &:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border.selected};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.content.tertiary};
    box-shadow: inset 0 -1px 0 ${({ theme }) => theme.colors.border.primary};
  }
`
