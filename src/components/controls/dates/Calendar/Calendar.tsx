import styled from "@emotion/styled"
import { DatePicker } from "@mantine/dates"
import { Box, BoxProps } from "../../../layout/Box/Box"

interface CalendarBaseProps {
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
  wrapperProps?: BoxProps
}

export type CalendarProps = CalendarBaseProps

export const Calendar = ({ wrapperProps, ...props }: CalendarProps): JSX.Element => {
  return (
    <Box {...wrapperProps}>
      <StyledCalendar
        ariaLabels={{ previousMonth: "Previous month", nextMonth: "Next month" }}
        hideOutsideDates
        maxLevel="month"
        withCellSpacing={false}
        {...props}
      />
    </Box>
  )
}

type CalendarValue = Date | null

const StyledCalendar = styled(DatePicker)`
  &.mantine-DatePicker-calendar {
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
      max-width: none;

      .mantine-DatePicker-calendarHeaderLevel {
        grid-area: text;
        font-size: ${({ theme }) => theme.fontSizes.md};
        color: ${({ theme }) => theme.colors.content.primary};
        justify-content: start;
      }
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
      svg {
        display: none;
      }
      &:first-of-type {
        grid-area: previous-month;
        &::before {
          font-family: ${({ theme }) => theme.fonts.body};
          font-size: ${({ theme }) => theme.fontSizes.md};
          content: "←";
        }
      }
      &:last-of-type {
        grid-area: next-month;
        &::before {
          font-family: ${({ theme }) => theme.fonts.body};
          font-size: ${({ theme }) => theme.fontSizes.md};
          content: "→";
        }
      }
    }
    .mantine-DatePicker-weekday {
      color: ${({ theme }) => theme.colors.content.secondary};
      font-size: ${({ theme }) => theme.fontSizes.md};
      font-weight: ${({ theme }) => theme.fontWeights.book};
      padding: 0;
    }
    .mantine-DatePicker-day {
      font-family: ${({ theme }) => theme.fonts.body};
      font-size: ${({ theme }) => theme.fontSizes.md};
      block-size: ${({ theme }) => 5 * theme.spacingBase}rem;
      inline-size: ${({ theme }) => 4.5 * theme.spacingBase}rem;
      line-height: ${({ theme }) => 5 * theme.spacingBase}rem;
      border-radius: ${({ theme }) => theme.borderRadii.sm};
      color: ${({ theme }) => theme.colors.content.primary};
      margin-block-start: ${({ theme }) => theme.spacingBase}rem;

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
        border: ${({ theme }) => theme.spacingBase / 8}rem solid
          ${({ theme }) => theme.colors.border.selected};
        text-decoration: underline;
      }
    }
  }
`
