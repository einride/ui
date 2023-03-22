import styled from "@emotion/styled"
import { DatePickerInput } from "@mantine/dates"
import { ComponentPropsWithoutRef, ReactNode } from "react"
import { ContentColor } from "@einride/core"
import { Box, BoxProps } from "../../../layout/Box/Box"
import { Caption } from "../../../typography/Caption/Caption"
import { Status } from "../../inputs/BaseInput/BaseInput"

interface DatePickerBaseProps {
  /** Whether to allow clearing value or not. Default is `false`. */
  clearable?: boolean

  /** Default value for uncontrolled input. */
  defaultValue?: DatePickerValue

  /** Controls disabled state. */
  disabled?: boolean

  /** Minimum possible date. */
  minDate?: Date

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
  message,
  messageProps,
  status,
  wrapperProps,
  inputFormat = "YYYY-MM-DD",
  ...props
}: DatePickerProps): JSX.Element => {
  return (
    <Box {...wrapperProps}>
      <StyledDatePickerInput
        ariaLabels={{ previousMonth: "Previous month", nextMonth: "Next month" }}
        hasLabel={"label" in props}
        maxLevel="month"
        popoverProps={{ clickOutsideEvents: ["pointerdown"] }} // to ensure popover is closed when clicking on a menu trigger
        valueFormat={inputFormat}
        withAsterisk={false}
        withCellSpacing={false}
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

  /** Whether the date picker has a label or not. */
  hasLabel: boolean
}

const StyledDatePickerInput = styled(DatePickerInput, {
  shouldForwardProp: (prop) => prop !== "hasLabel", // avoid passing `hasLabel` attribute to HTML element
})<StyledDatePickerProps>`
  .mantine-DatePickerInput-label {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.book};
    line-height: calc(4 / 3);
    color: ${({ theme }) => theme.colors.content.secondary};
    padding-block-start: 5px;
    padding-block-end: 3px;
  }
  .mantine-DatePickerInput-input {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.book};
    line-height: calc(4 / 3);
    background: ${({ theme }) => theme.colors.background.secondary};
    color: ${({ theme }) => theme.colors.content.primary};
    border: none;
    inline-size: 100%;
    min-inline-size: ${({ theme }) => 29 * theme.spacingBase}rem;
    display: block;
    block-size: ${({ theme }) => 6 * theme.spacingBase}rem;
    padding-inline: ${({ theme }) => 2 * theme.spacingBase}rem
      ${({ theme, clearable }) => (clearable ? 6 : 2) * theme.spacingBase}rem;
    border-radius: ${({ hasLabel, theme }) =>
      hasLabel ? theme.borderRadii.sm : theme.borderRadii.xl};

    &:hover {
      background: ${({ theme }) => theme.colors.background.tertiary};
    }
    .mantine-DatePickerInput-placeholder {
      color: ${({ theme }) => theme.colors.content.secondary};
    }
    &:focus {
      outline: none;
      box-shadow: 0px 0px 0px ${({ theme }) => theme.spacingBase / 8}rem
        ${({ theme }) => theme.colors.border.selected} inset;
    }
    &:disabled {
      background: ${({ theme }) => theme.colors.background.secondary};
      color: ${({ theme }) => theme.colors.content.tertiary};
      cursor: not-allowed;
      opacity: 1;
    }
    &:disabled .mantine-DatePickerInput-placeholder {
      color: ${({ theme }) => theme.colors.content.tertiary};
    }
  }
  .mantine-DatePickerInput-rightSection {
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
  .mantine-Popover-dropdown {
    background: ${({ theme }) => theme.colors.background.secondaryElevated};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadii.lg};
    padding: ${({ theme }) => 2 * theme.spacingBase}rem;

    .mantine-DatePickerInput-calendarHeader {
      display: grid;
      align-items: center;
      gap: ${({ theme }) => theme.spacingBase}rem;
      grid-template-areas: "text previous-month next-month";
      grid-template-columns: auto min-content min-content;
      max-width: none;
      white-space: nowrap;

      .mantine-DatePickerInput-calendarHeaderLevel {
        grid-area: text;
        font-size: ${({ theme }) => theme.fontSizes.md};
        color: ${({ theme }) => theme.colors.content.primary};
        justify-content: start;
      }
    }

    .mantine-DatePickerInput-calendarHeaderControl {
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
    .mantine-DatePickerInput-weekday {
      color: ${({ theme }) => theme.colors.content.secondary};
      font-size: ${({ theme }) => theme.fontSizes.md};
      font-weight: ${({ theme }) => theme.fontWeights.book};
      padding: 0;
    }
    .mantine-DatePickerInput-monthCell {
      padding: 0; // until withCellSpacing prop works
    }
    .mantine-DatePickerInput-day {
      font-family: ${({ theme }) => theme.fonts.body};
      font-size: ${({ theme }) => theme.fontSizes.md};
      block-size: ${({ theme }) => 5 * theme.spacingBase}rem;
      inline-size: ${({ theme }) => 4.5 * theme.spacingBase}rem;
      line-height: ${({ theme }) => 5 * theme.spacingBase}rem;
      border-radius: ${({ theme }) => theme.borderRadii.sm};
      color: ${({ theme }) => theme.colors.content.primary};
      margin-block-start: ${({ theme }) => theme.spacingBase}rem;
      display: flex;
      align-items: center;
      justify-content: center;

      &[data-today] {
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
        position: relative;

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
