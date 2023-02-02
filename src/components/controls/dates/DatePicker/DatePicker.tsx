import styled from "@emotion/styled"
import { DatePicker as MantineDatePicker } from "@mantine/dates"
import { ComponentPropsWithoutRef, ReactNode } from "react"
import { useTheme } from "../../../../hooks/useTheme"
import { ContentColor } from "../../../../lib/theme/types"
import { Box, BoxProps } from "../../../layout/Box/Box"
import { Caption } from "../../../typography/Caption/Caption"
import { Status } from "../../inputs/BaseInput/BaseInput"

interface DatePickerBaseProps {
  /** Whether to allow free input. Default is `false`. */
  allowFreeInput?: boolean

  /** Whether to allow clearing value or not. Default is `false`. */
  clearable?: boolean

  /** Default value for uncontrolled input. */
  defaultValue?: DatePickerValue

  /** Controls disabled state. */
  disabled?: boolean

  /** Maximum possible date. */
  maxDate?: Date

  /** Message shown below input field. Can be used together with `status` to show a success or error message. */
  message?: ReactNode

  /** Props passed to message element. */
  messageProps?: Omit<ComponentPropsWithoutRef<"span">, "color"> & { "data-testid"?: string }

  /** Called when date changes. */
  onChange?: (value: DatePickerValue) => void

  /** Placeholder, displayed when date is not selected. */
  placeholder?: string

  /** Controls required state. */
  required?: boolean

  /** Status of the input, controlling color and icon. */
  status?: Status | undefined

  /** Selected date, required with controlled input. */
  value?: DatePickerValue

  /** Props passed to root element. */
  wrapperProps?: BoxProps

  /** `dayjs` input format. Default is `YYYY-MM-DD`. */
  inputFormat?: string
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

export const DatePicker = ({
  allowFreeInput = false,
  message,
  messageProps,
  status,
  wrapperProps,
  inputFormat = "YYYY-MM-DD",
  ...props
}: DatePickerProps): JSX.Element => {
  const theme = useTheme()
  return (
    <Box {...wrapperProps}>
      <StyledDatePicker
        allowFreeInput={allowFreeInput}
        allowLevelChange={false}
        clearable={false}
        clickOutsideEvents={["pointerdown"]} // to ensure dropdown is closed when clicking on a menu trigger
        dayStyle={() => ({
          fontFamily: theme.fonts.body,
          fontSize: theme.fontSizes.md,
          fontWeight: theme.fontWeights.book,
        })}
        dayClassName={(date) => (date.toDateString() === new Date().toDateString() ? "today" : "")}
        hasLabel={"label" in props}
        inputFormat={inputFormat}
        withAsterisk={false}
        transitionDuration={100}
        {...props}
      />
      {message && (
        <Caption color={getMessageColor(status)} {...messageProps}>
          {message}
        </Caption>
      )}
    </Box>
  )
}

const getMessageColor = (status: Status | undefined): ContentColor => {
  switch (status) {
    case "success":
      return "positive"
    case "fail":
      return "negative"
    default:
      return "secondary"
  }
}

type DatePickerValue = Date | null

interface StyledDatePickerProps {
  /** Whether to allow clearing value or not. Default is `false`. */
  clearable?: boolean

  hasLabel: boolean
}

const StyledDatePicker = styled(MantineDatePicker, {
  shouldForwardProp: (prop) => prop !== "hasLabel", // avoid passing `hasLabel` attribute to HTML element
})<StyledDatePickerProps>`
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
    background: ${({ theme }) => theme.colors.background.secondary};
    color: ${({ theme }) => theme.colors.content.primary};
    border: none;
    inline-size: 100%;
    display: block;
    padding-block: ${({ theme }) => 1.5 * theme.spacingBase}rem;
    padding-inline: ${({ theme }) => 2 * theme.spacingBase}rem
      ${({ theme, clearable }) => (clearable ? 6 : 2) * theme.spacingBase}rem;
    block-size: unset;
    border-radius: ${({ hasLabel, theme }) =>
      hasLabel ? theme.borderRadii.sm : theme.borderRadii.xl};

    &:hover {
      background: ${({ theme }) => theme.colors.background.tertiary};
    }
    &::placeholder {
      color: ${({ theme }) => theme.colors.content.secondary};
    }
    &:focus {
      outline: ${({ theme }) => theme.spacingBase / 8}rem solid
        ${({ theme }) => theme.colors.border.selected};
    }
    &:disabled {
      background: ${({ theme }) => theme.colors.background.secondary};
      color: ${({ theme }) => theme.colors.content.tertiary};
      cursor: not-allowed;
      opacity: 1;
    }
    &:disabled::placeholder {
      color: ${({ theme }) => theme.colors.content.tertiary};
    }
  }
  .mantine-DatePicker-rightSection {
    inset-inline-end: ${({ theme }) => 1 * theme.spacingBase}rem;
    inline-size: ${({ theme }) => 3 * theme.spacingBase}rem;

    button {
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
  }
  .mantine-DatePicker-dropdown {
    background: ${({ theme }) => theme.colors.background.secondaryElevated};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadii.lg};
    padding: ${({ theme }) => 2 * theme.spacingBase}rem;
    box-shadow: none;

    .mantine-DatePicker-calendarHeader {
      display: grid;
      align-items: center;
      gap: ${({ theme }) => theme.spacingBase}rem;
      grid-template-areas: "text previous-month next-month";
      grid-template-columns: ${({ theme }) => 18.75 * theme.spacingBase}rem auto auto;
      white-space: nowrap;

      .mantine-DatePicker-calendarHeaderLevel {
        grid-area: text;
        font-size: ${({ theme }) => theme.fontSizes.md};
        color: ${({ theme }) => theme.colors.content.primary};
        padding: 0;
        justify-content: start;
      }
    }

    .mantine-DatePicker-calendarHeaderControl {
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
    .mantine-DatePicker-weekday {
      color: ${({ theme }) => theme.colors.content.secondary};
      font-size: ${({ theme }) => theme.fontSizes.md};
      font-weight: ${({ theme }) => theme.fontWeights.book};
    }
    .mantine-DatePicker-day {
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
