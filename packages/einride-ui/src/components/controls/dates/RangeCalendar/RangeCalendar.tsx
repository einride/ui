import styled from "@emotion/styled"
import { DatePicker } from "@mantine/dates"
import { Box, BoxProps } from "../../../layout/Box/Box"

export interface RangeCalendarProps {
  /** Initial date displayed, used for uncontrolled component. */
  defaultDate?: Date

  /** Default value for uncontrolled component. */
  defaultValue?: Date | [Date, Date]

  /** Minimum possible date. */
  minDate?: Date

  /** Maximum possible date. */
  maxDate?: Date

  /** Called when date changes. */
  onChange?: (value: RangeCalendarValue) => void

  /** Selected date, required with controlled input. */
  value?: RangeCalendarValue

  /** Props passed to root element. */
  wrapperProps?: BoxProps
}

/**
 * @deprecated Use `<DateRangePicker>` from `@einride/ui-dates` instead.
 */
export const RangeCalendar = ({
  wrapperProps,
  ...props
}: RangeCalendarProps): React.JSX.Element => {
  return (
    <Box {...wrapperProps}>
      <StyledDatePicker
        allowSingleDateInRange
        ariaLabels={{ previousMonth: "Previous month", nextMonth: "Next month" }}
        hideOutsideDates
        maxLevel="month"
        withCellSpacing={false}
        type="range"
        {...props}
      />
    </Box>
  )
}

type RangeCalendarValue = [Date | null, Date | null]

const StyledDatePicker = styled(DatePicker)`
  background: ${({ theme }) => theme.colors.background.secondaryElevated};
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  padding: ${({ theme }) => 2 * theme.spacingBase}rem;
  display: inline-flex;

  .mantine-DatePicker-calendarHeader {
    display: grid;
    align-items: center;
    gap: ${({ theme }) => theme.spacingBase}rem;
    grid-template-areas: "text previous-month next-month";
    grid-template-columns: auto min-content min-content;
    margin-bottom: ${({ theme }) => 2 * theme.spacingBase}rem;
  }

  .mantine-DatePicker-calendarHeaderLevel {
    grid-area: text;
  }

  .mantine-DatePicker-calendarHeaderControl {
    background: ${({ theme }) => theme.colors.buttons.background.tertiary};
    color: ${({ theme }) => theme.colors.content.primary};
    border-radius: ${({ theme }) => theme.borderRadii.full};
    block-size: ${({ theme }) => 6 * theme.spacingBase}rem;
    inline-size: ${({ theme }) => 6 * theme.spacingBase}rem;
    &:hover {
      background: ${({ theme }) => theme.colors.buttons.background.hover.tertiary};
    }
    &:active {
      background: ${({ theme }) => theme.colors.buttons.background.active.tertiary};
    }
    &:focus-visible {
      outline: none;
      background: ${({ theme }) => theme.colors.buttons.background.focused.tertiary};
      border: ${({ theme }) => theme.spacingBase / 8}rem solid
        ${({ theme }) => theme.colors.border.selected};
    }
    .mantine-DatePicker-calendarHeaderControlIcon {
      display: none !important;
    }
    &:first-of-type {
      grid-area: previous-month;
      &::before {
        content: "←";
      }
    }
    &:last-of-type {
      grid-area: next-month;
      &::before {
        content: "→";
      }
    }
  }

  .mantine-DatePicker-weekdaysRow {
    block-size: ${({ theme }) => 5 * theme.spacingBase}rem;
    padding: 0;
  }

  .mantine-DatePicker-weekday {
    color: ${({ theme }) => theme.colors.content.secondary};
    font-weight: ${({ theme }) => theme.fontWeights.book};
  }

  .mantine-DatePicker-monthCell {
    padding: 0; // should be removed when withCellSpacing={false} works
  }

  .mantine-DatePicker-day {
    block-size: ${({ theme }) => 5 * theme.spacingBase}rem;
    inline-size: ${({ theme }) => 4.5 * theme.spacingBase}rem;
    border-radius: ${({ theme }) => theme.borderRadii.sm};
    margin-block-start: ${({ theme }) => theme.spacingBase}rem;

    &[data-hidden] {
      display: none;
    }
    &[data-today] {
      color: ${({ theme }) => theme.colors.content.positive};
    }
    &:hover {
      background: ${({ theme }) => theme.colors.background.tertiary};
      color: ${({ theme }) => theme.colors.content.primary};
    }
    &[data-selected] {
      background: ${({ theme }) => theme.colors.background.primaryInverted};
      color: ${({ theme }) => theme.colors.content.primaryInverted};
      position: relative;

      &:focus-visible {
        background: ${({ theme }) => theme.colors.background.primaryInverted};
        color: ${({ theme }) => theme.colors.content.primaryInverted};
        text-decoration: underline;
      }
    }
    &[data-in-range]:not([data-selected]) {
      background: ${({ theme }) => theme.colors.background.tertiary};
      color: ${({ theme }) => theme.colors.content.primary};
      border-radius: unset;
    }
    &[data-first-in-range]::before {
      content: "";
      position: absolute;
      inset: 0;
      border-start-start-radius: ${({ theme }) => theme.borderRadii.sm};
      border-end-start-radius: ${({ theme }) => theme.borderRadii.sm};
      background: ${({ theme }) => theme.colors.background.tertiary};
    }
    &[data-first-in-range][data-last-in-range] {
      border-radius: ${({ theme }) => theme.borderRadii.sm};
    }
    &:disabled {
      color: ${({ theme }) => theme.colors.content.tertiary};
    }
    &:focus-visible {
      outline: none;
      background: ${({ theme }) => theme.colors.background.tertiary};
      color: ${({ theme }) => theme.colors.content.primary};
      outline: ${({ theme }) => theme.spacingBase / 8}rem solid
        ${({ theme }) => theme.colors.border.selected};
      text-decoration: underline;
    }
  }
`
