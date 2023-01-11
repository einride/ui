import styled from "@emotion/styled"
import { RangeCalendar as MantineRangeCalendar } from "@mantine/dates"
import { useTheme } from "../../../../hooks/useTheme"
import { Box, BoxProps } from "../../../layout/Box/Box"

interface RangeCalendarBaseProps {
  /** Maximum possible date. */
  maxDate?: Date

  /** Called when date changes. */
  onChange: (value: RangeCalendarValue) => void

  /** Selected date, required with controlled input. */
  value: RangeCalendarValue

  /** Props passed to root element. */
  wrapperProps?: BoxProps
}

export type RangeCalendarProps = RangeCalendarBaseProps

export const RangeCalendar = ({ wrapperProps, ...props }: RangeCalendarProps): JSX.Element => {
  const theme = useTheme()
  return (
    <Box {...wrapperProps}>
      <StyledRangeCalendar
        allowLevelChange={false}
        dayStyle={() => ({
          fontFamily: theme.fonts.body,
          fontSize: theme.fontSizes.md,
          fontWeight: theme.fontWeights.book,
        })}
        dayClassName={(date) => (date.toDateString() === new Date().toDateString() ? "today" : "")}
        {...props}
      />
    </Box>
  )
}

type RangeCalendarValue = [Date | null, Date | null]

const StyledRangeCalendar = styled(MantineRangeCalendar)`
  &.mantine-RangeCalendar-calendarBase {
    background: ${({ theme }) => theme.colors.background.secondaryElevated};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadii.lg};
    padding: ${({ theme }) => 2 * theme.spacingBase}rem;
    box-shadow: none;
    max-width: none;
    display: inline-flex;

    .mantine-RangeCalendar-calendarHeader {
      display: grid;
      align-items: center;
      gap: ${({ theme }) => theme.spacingBase}rem;
      grid-template-areas: "text previous-month next-month";
      grid-template-columns: ${({ theme }) => 18.75 * theme.spacingBase}rem auto auto;
      white-space: nowrap;

      .mantine-RangeCalendar-calendarHeaderLevel {
        grid-area: text;
        font-size: ${({ theme }) => theme.fontSizes.md};
        color: ${({ theme }) => theme.colors.content.primary};
        padding: 0;
        justify-content: start;
      }
    }

    .mantine-RangeCalendar-calendarHeaderControl {
      background: ${({ theme }) => theme.colors.buttons.background.tertiary};
      color: ${({ theme }) => theme.colors.content.primary};
      border-radius: ${({ theme }) => theme.borderRadii.full};
      block-size: ${({ theme }) => 6 * theme.spacingBase}rem;
      inline-size: ${({ theme }) => 6 * theme.spacingBase}rem;
      transform: none;
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
        gria-area: next-month;
        &::before {
          font-family: ${({ theme }) => theme.fonts.body};
          font-size: ${({ theme }) => theme.fontSizes.md};
          content: "→";
        }
      }
    }
    .mantine-RangeCalendar-weekday {
      color: ${({ theme }) => theme.colors.content.secondary};
      font-size: ${({ theme }) => theme.fontSizes.md};
      font-weight: ${({ theme }) => theme.fontWeights.book};
    }
    .mantine-RangeCalendar-day {
      border-radius: ${({ theme }) => theme.borderRadii.sm};
      color: ${({ theme }) => theme.colors.content.primary};
      margin-block-start: ${({ theme }) => theme.spacingBase}rem;
      display: flex;
      align-items: center;
      justify-content: center;

      &.today {
        color: ${({ theme }) => theme.colors.content.positive};
      }
      &[data-outside] {
        display: none;
      }
      &[data-in-range]:not([data-selected]) {
        background: ${({ theme }) => theme.colors.background.tertiary};
        color: ${({ theme }) => theme.colors.content.primary};
        border-radius: unset;
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
        &[data-first-in-range]::before {
          content: "";
          position: absolute;
          inset: 0;
          border-start-start-radius: ${({ theme }) => theme.borderRadii.sm};
          border-end-start-radius: ${({ theme }) => theme.borderRadii.sm};
          background: ${({ theme }) => theme.colors.background.tertiary};
        }
        &[data-last-in-range]::before {
          content: "";
          position: absolute;
          inset: 0;
          border-start-end-radius: ${({ theme }) => theme.borderRadii.sm};
          border-end-end-radius: ${({ theme }) => theme.borderRadii.sm};
          background: ${({ theme }) => theme.colors.background.tertiary};
        }
        &[data-first-in-range][data-last-in-range] {
          border-radius: ${({ theme }) => theme.borderRadii.sm};
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
