import styled from "@emotion/styled"
import { CalendarDate } from "@internationalized/date"
import { useCalendarCell } from "@react-aria/calendar"
import { CalendarState } from "@react-stately/calendar"
import { useRef } from "react"
import { Box } from "../../layout/Box/Box"

interface CalendarCellProps {
  state: CalendarState
  date: CalendarDate
}

export const CalendarCell = ({ state, date }: CalendarCellProps): JSX.Element => {
  const ref = useRef<HTMLButtonElement>(null)
  const { cellProps, buttonProps, isOutsideVisibleRange, formattedDate } = useCalendarCell(
    { date },
    state,
    ref,
  )

  return (
    <Cell as="td" {...cellProps}>
      <Button {...buttonProps} ref={ref} hidden={isOutsideVisibleRange}>
        {formattedDate}
      </Button>
    </Cell>
  )
}

const Cell = styled(Box)`
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  padding: 0;

  &[aria-selected="true"] {
    background: ${({ theme }) => theme.colors.background.primaryInverted};
    color: ${({ theme }) => theme.colors.content.primaryInverted};
  }

  &:has([role="button"]:hover):not([aria-selected="true"]) {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }

  &:has([role="button"]:focus-visible):not([aria-selected="true"]) {
    background: ${({ theme }) => theme.colors.background.tertiary};
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border.selected};
  }
`

const Button = styled.button`
  block-size: ${({ theme }) => 5 * theme.spacingBase}rem;
  inline-size: 100%;

  &:focus-visible {
    outline: none;
  }
`
