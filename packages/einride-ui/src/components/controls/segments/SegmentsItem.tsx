import styled from "@emotion/styled"
import * as RadioGroup from "@radix-ui/react-radio-group"
import { ReactNode, forwardRef } from "react"

export interface SegmentsItemProps {
  /** Content of the segment trigger. */
  children: ReactNode

  /** The value given as data when submitted with a name. */
  value: string
}

/** Radio button. */
export const SegmentsItem = forwardRef<HTMLButtonElement, SegmentsItemProps>(
  ({ children, value }, ref) => {
    return (
      <Item value={value} ref={ref}>
        {children}
      </Item>
    )
  },
)

const Item = styled(RadioGroup.Item)`
  padding-inline: ${({ theme }) => 2 * theme.spacingBase}rem;
  padding-block: ${({ theme }) => 1.5 * theme.spacingBase}rem;
  border-radius: ${({ theme }) => theme.borderRadii.full};
  outline: none;

  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiaryElevated};
  }

  &[aria-checked="true"] {
    background: ${({ theme }) => theme.colors.background.positive};
    color: ${({ theme }) => theme.colors.content.primaryInverted};
  }

  &:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 0.0625rem ${({ theme }) => theme.colors.border.selected};
  }
`
