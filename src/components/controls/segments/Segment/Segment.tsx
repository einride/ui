import styled from "@emotion/styled"
import { ComponentPropsWithoutRef, forwardRef } from "react"

type SegmentProps = ComponentPropsWithoutRef<"button">

/** @deprecated since v6.71.2. Use `<Tabs>` instead. */
export const Segment = forwardRef<HTMLButtonElement, SegmentProps>(
  ({ children, ...props }, ref) => {
    return (
      <Wrapper role="tab" {...props} ref={ref}>
        {children}
      </Wrapper>
    )
  },
)

const Wrapper = styled.button`
  color: ${({ theme }) => theme.colors.content.secondary};
  padding-block-start: ${({ theme }) => theme.spacer + 1}px;
  padding-block-end: ${({ theme }) => 2 * theme.spacer - 1}px;
  box-shadow: inset 0 -1px 0 ${({ theme }) => theme.colors.border.primary};
  margin-block-end: ${({ theme }) => 3 * theme.spacer}px;

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
