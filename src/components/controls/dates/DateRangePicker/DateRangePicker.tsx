import styled from "@emotion/styled"
import { DateRangePicker as MantineDateRangePicker } from "@mantine/dates"
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"
import { useTheme } from "../../../../hooks/useTheme"

interface DateRangePickerBaseProps {
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
      clearable={false}
      dayStyle={() => ({
        fontFamily: theme.fonts.body,
        fontSize: theme.fontSizes.md,
        fontWeight: theme.fontWeights.book,
      })}
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
    padding-block: ${({ theme }) => 1.5 * theme.spacer}px;
    padding-inline: ${({ theme }) => 2 * theme.spacer}px;
    height: unset;
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
      grid-template-columns: 150px auto auto;
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
        height: ${({ theme }) => 6 * theme.spacingBase}rem;
        width: ${({ theme }) => 6 * theme.spacingBase}rem;

        &:focus-visible {
          outline: none;
          background: ${({ theme }) => theme.colors.buttons.background.focused.tertiary};
          box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border.selected};
        }
        &:first-child {
          grid-area: previous-month;
        }
        &:last-child {
          gria-area: next-month;
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
      padding: 8px 4.5px;
      margin-block-start: 8px;
      display: flex;
      align-items: center;
      justify-content: center;

      &[data-outside] {
        display: none;
      }
      &[data-in-range]:not([data-selected]) {
        background: ${({ theme }) => theme.colors.background.tertiaryOpacity};
        border-radius: unset;
      }
      &[data-weekend] {
        color: ${({ theme }) => theme.colors.content.primary};
      }
      &:hover {
        background: ${({ theme }) => theme.colors.background.tertiary};
      }
      &[data-selected] {
        background: ${({ theme }) => theme.colors.background.primaryElevatedInverted};
        color: ${({ theme }) => theme.colors.content.primaryInverted};

        &[data-first-in-range] {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        &[data-last-in-range] {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
      &:focus-visible {
        outline: none;
        box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border.selected};
      }
    }
  }
`
