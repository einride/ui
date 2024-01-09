import { Box } from "@einride/ui"
import styled from "@emotion/styled"
import { DatePicker as MantineDatePicker } from "@mantine/dates"
import { ComponentPropsWithoutRef } from "react"

export interface DatePickerProps {
  /** Initial date displayed, used for uncontrolled component. */
  defaultDate?: Date

  /** Default value for uncontrolled component. */
  defaultValue?: Date

  /** Minimum possible date. */
  minDate?: Date

  /** Maximum possible date. */
  maxDate?: Date

  /** Called when date changes. */
  onChange?: (value: CalendarValue) => void

  /** Selected date, required with controlled input. */
  value?: CalendarValue

  /** Props passed to root element. */
  wrapperProps?: ComponentPropsWithoutRef<typeof Box>
}

export const DatePicker = ({ wrapperProps, ...props }: DatePickerProps): React.JSX.Element => {
  return (
    <Box {...wrapperProps}>
      <StyledCalendar
        ariaLabels={{ previousMonth: "Previous month", nextMonth: "Next month" }}
        hideOutsideDates
        maxLevel="month"
        withCellSpacing={false}
        unstyled
        {...props}
      />
    </Box>
  )
}

type CalendarValue = Date | null

const StyledCalendar = styled(MantineDatePicker)`
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
    padding: 0;
  }

  .mantine-DatePicker-day {
    block-size: ${({ theme }) => 5 * theme.spacingBase}rem;
    inline-size: ${({ theme }) => 4.5 * theme.spacingBase}rem;
    border-radius: ${({ theme }) => theme.borderRadii.sm};
    margin-block-start: ${({ theme }) => theme.spacingBase}rem;

    &[data-hidden] {
      display: none; // TODO: use hideOutsideDates instead when bug is fixed in Mantine
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

      &:focus-visible {
        background: ${({ theme }) => theme.colors.background.primaryInverted};
        color: ${({ theme }) => theme.colors.content.primaryInverted};
        text-decoration: underline;
      }
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
