import styled from "@emotion/styled"
import { DatePicker as MantineDatePicker } from "@mantine/dates"
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react"
import { useTheme } from "../../../../hooks/useTheme"

interface DatePickerBaseProps {
  /** Default value for uncontrolled input. */
  defaultValue?: Date

  /** Called when date changes. */
  onChange?: (value: Date) => void

  /** Selected date, required with controlled input. */
  value?: Date

  /** Props passed to root element. */
  wrapperProps: Pick<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    "key" | keyof HTMLAttributes<HTMLDivElement>
  >
}

interface DatePickerWithLabelProps {
  /** Date picker label, displayed before date picker. */
  label: ReactNode
}

interface DatePickerWithoutLabelProps {
  /** Accessible name, required when `label` is not provided. */
  "aria-label": string
}

export type DatePickerProps = DatePickerBaseProps &
  (DatePickerWithLabelProps | DatePickerWithoutLabelProps)

export const DatePicker = ({ ...props }: DatePickerProps): JSX.Element => {
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

const StyledDatePicker = styled(MantineDatePicker)`
  .mantine-DatePicker-label {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.book};
    line-height: calc(4 / 3);
    color: ${({ theme }) => theme.colors.content.secondary};
    padding-block-start: 5px;
    padding-block-end: 3px;
  }
  .mantine-DatePicker-input {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.book};
    line-height: calc(4 / 3);
    background: ${({ theme }) => theme.colors.background.secondaryOpacity};
    color: ${({ theme }) => theme.colors.content.primary};
    border: none;
    inline-size: 100%;
    display: block;
    padding-block: ${({ theme }) => 1.5 * theme.spacer}px;
    padding-inline: ${({ theme }) => 2 * theme.spacer}px;
    height: unset;
    border-radius: ${({ theme }) => theme.borderRadii.sm};

    &:hover {
      background: ${({ theme }) => theme.colors.background.tertiaryOpacity};
    }
  }
  .mantine-DatePicker-dropdown {
    background: ${({ theme }) => theme.colors.background.secondary};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadii.lg};
    padding: ${({ theme }) => 2 * theme.spacingBase}rem;
    box-shadow: none;
  }
  .mantine-DatePicker-calendarBase {
    max-width: none;
  }
  .mantine-DatePicker-weekday {
    color: ${({ theme }) => theme.colors.content.secondary};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.book};
  }
  .mantine-DatePicker-calendarHeaderControl {
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
  }
  .mantine-DatePicker-cell {
    padding-block: 4px;
    padding-inline: 5px;
  }
  .mantine-DatePicker-calendarHeaderLevel {
    font-size: ${({ theme }) => theme.fontSizes.md};
    color: ${({ theme }) => theme.colors.content.primary};
  }
  .mantine-DatePicker-day {
    border-radius: ${({ theme }) => theme.borderRadii.sm};
    color: ${({ theme }) => theme.colors.content.primary};
    padding: 8px 4.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    &[data-outside] {
      display: none;
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
    }
    &:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 1px ${({ theme }) => theme.colors.border.selected};
    }
  }
`
