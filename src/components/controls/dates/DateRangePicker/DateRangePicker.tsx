import styled from "@emotion/styled"
import { DateRangePicker as MantineDateRangePicker } from "@mantine/dates"
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"
import { useTheme } from "../../../../hooks/useTheme"

interface DateRangePickerBaseProps {
  /** Whether to allow clearing value or not. Default it `false`. */
  clearable?: boolean

  /** Default value for uncontrolled input. */
  defaultValue?: DateRangePickerValue

  /** Maximum possible date. */
  maxDate?: Date

  /** Called when date changes. */
  onChange?: (value: DateRangePickerValue) => void

  /** Placeholder, displayed when date is not selected. */
  placeholder?: string

  /** Selected date, required with controlled input. */
  value?: DateRangePickerValue

  /** Props passed to root element. */
  wrapperProps?: Pick<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    "key" | keyof HTMLAttributes<HTMLDivElement>
  >
}

interface DateRangePickerWithLabelProps {
  /** Date picker label, displayed before date picker. */
  label: ReactNode
}

interface DateRangePickerWithoutLabelProps {
  /** Accessible name, required when `label` is not provided. */
  "aria-label": string
}

export type DateRangePickerProps = DateRangePickerBaseProps &
  (DateRangePickerWithLabelProps | DateRangePickerWithoutLabelProps)

export const DateRangePicker = ({ ...props }: DateRangePickerProps): JSX.Element => {
  const theme = useTheme()
  return (
    <StyledDatePicker
      allowLevelChange={false}
      allowSingleDateInRange
      clearable={false}
      dayStyle={() => ({
        fontFamily: theme.fonts.body,
        fontSize: theme.fontSizes.md,
        fontWeight: theme.fontWeights.book,
      })}
      dayClassName={(date) => (date.getDate() === new Date().getDate() ? "today" : "")}
      inputFormat="YYYY-MM-DD"
      {...props}
    />
  )
}

export type DateRangePickerValue = [Date | null, Date | null]

const StyledDatePicker = styled(MantineDateRangePicker)`
  .mantine-DateRangePicker-label {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.book};
    line-height: calc(4 / 3);
    color: ${({ theme }) => theme.colors.content.secondary};
    padding-block-start: 5px;
    padding-block-end: 3px;
  }
  .mantine-DateRangePicker-input {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.book};
    line-height: calc(4 / 3);
    background: ${({ theme }) => theme.colors.background.secondaryOpacity};
    color: ${({ theme }) => theme.colors.content.primary};
    border: none;
    inline-size: 100%;
    display: block;
    min-inline-size: ${({ theme }) =>
      35 * theme.spacingBase}rem; // make sure range fits in input field
    padding-block: ${({ theme }) => 1.5 * theme.spacingBase}rem;
    padding-inline: ${({ theme }) => 2 * theme.spacingBase}rem;
    block-size: unset;
    border-radius: ${({ theme }) => theme.borderRadii.sm};

    &:hover {
      background: ${({ theme }) => theme.colors.background.tertiaryOpacity};
    }
    &::placeholder {
      color: ${({ theme }) => theme.colors.content.secondary};
    }
    &:focus {
      box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.border.selected} inset;
      outline: none;
    }
  }
  .mantine-DateRangePicker-rightSection button {
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      display: none;
    }
    &::before {
      font-family: ${({ theme }) => theme.fonts.body};
      font-size: ${({ theme }) => theme.fontSizes.md};
      color: ${({ theme }) => theme.colors.content.primary};
      content: "❌";
    }
  }
  .mantine-DateRangePicker-dropdown {
    background: ${({ theme }) => theme.colors.background.secondary};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadii.lg};
    padding: ${({ theme }) => 2 * theme.spacingBase}rem;
    box-shadow: none;

    .mantine-DateRangePicker-calendarHeader {
      display: grid;
      align-items: center;
      gap: ${({ theme }) => theme.spacingBase}rem;
      grid-template-areas: "text previous-month next-month";
      grid-template-columns: ${({ theme }) => 18.75 * theme.spacingBase}rem auto auto;
      white-space: nowrap;

      .mantine-DateRangePicker-calendarHeaderLevel {
        grid-area: text;
        font-size: ${({ theme }) => theme.fontSizes.md};
        color: ${({ theme }) => theme.colors.content.primary};
        padding: 0;
        justify-content: start;
      }

      .mantine-DateRangePicker-calendarHeaderControl {
        background: ${({ theme }) => theme.colors.background.primary};
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
          box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border.selected};
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
    }
    .mantine-DateRangePicker-weekday {
      color: ${({ theme }) => theme.colors.content.secondary};
      font-size: ${({ theme }) => theme.fontSizes.md};
      font-weight: ${({ theme }) => theme.fontWeights.book};
    }
    .mantine-DateRangePicker-day {
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
        background: ${({ theme }) => theme.colors.background.tertiaryOpacity};
        color: ${({ theme }) => theme.colors.content.primary};
        border-radius: unset;
      }
      &[data-weekend] {
        color: ${({ theme }) => theme.colors.content.primary};
      }
      &:hover {
        background: ${({ theme }) => theme.colors.background.tertiary};
        color: ${({ theme }) => theme.colors.content.primary};
      }
      &[data-selected] {
        background: ${({ theme }) => theme.colors.background.primaryInverted};
        color: ${({ theme }) => theme.colors.content.primaryInverted};

        &:focus-visible {
          background: ${({ theme }) => theme.colors.background.primaryElevatedInverted};
          color: ${({ theme }) => theme.colors.content.primaryInverted};
          text-decoration: underline;
        }
        &[data-first-in-range]::before {
          content: "";
          position: absolute;
          inset: 0;
          border-start-start-radius: ${({ theme }) => theme.borderRadii.sm};
          border-end-start-radius: ${({ theme }) => theme.borderRadii.sm};
          background: ${({ theme }) => theme.colors.background.tertiaryOpacity};
        }
        &[data-last-in-range]::before {
          content: "";
          position: absolute;
          inset: 0;
          border-start-end-radius: ${({ theme }) => theme.borderRadii.sm};
          border-end-end-radius: ${({ theme }) => theme.borderRadii.sm};
          background: ${({ theme }) => theme.colors.background.tertiaryOpacity};
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
        box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border.selected};
        text-decoration: underline;
      }
    }
  }
`
