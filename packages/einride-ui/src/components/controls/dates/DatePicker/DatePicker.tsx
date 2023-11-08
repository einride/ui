import { Global, css } from "@emotion/react"
import styled from "@emotion/styled"
import { DatePickerInput } from "@mantine/dates"
import { ComponentPropsWithoutRef, ReactNode } from "react"
import { useTheme } from "../../../../hooks/useTheme"
import { ContentColor } from "../../../../lib/theme/types"
import { Box, BoxProps } from "../../../layout/Box/Box"
import { Caption } from "../../../typography/Caption/Caption"
import { Status } from "../../inputs/BaseInput/BaseInput"

export interface DatePickerBaseProps {
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

/**
 * @deprecated Use `<DatePickerInput>` from `@einride/ui-dates` instead.
 */
export const DatePicker = ({
  message,
  messageProps,
  status,
  wrapperProps,
  inputFormat = "YYYY-MM-DD",
  ...props
}: DatePickerProps): React.JSX.Element => {
  const theme = useTheme()
  return (
    <Box {...wrapperProps}>
      <Global
        styles={css`
          .mantine-Popover-dropdown {
            position: absolute;
            background: ${theme.colors.background.secondaryElevated};
            border-radius: ${theme.borderRadii.lg};
            padding: ${2 * theme.spacingBase}rem;
            display: inline-flex;
          }

          .mantine-DatePickerInput-calendarHeader {
            display: grid;
            align-items: center;
            gap: ${theme.spacingBase}rem;
            grid-template-areas: "text previous-month next-month";
            grid-template-columns: auto min-content min-content;
            margin-bottom: ${2 * theme.spacingBase}rem;
          }

          .mantine-DatePickerInput-calendarHeaderLevel {
            grid-area: text;
          }

          .mantine-DatePickerInput-calendarHeaderControl {
            background: ${theme.colors.buttons.background.tertiary};
            color: ${theme.colors.content.primary};
            border-radius: ${theme.borderRadii.full};
            block-size: ${6 * theme.spacingBase}rem;
            inline-size: ${6 * theme.spacingBase}rem;
            &:hover {
              background: ${theme.colors.buttons.background.hover.tertiary};
            }
            &:active {
              background: ${theme.colors.buttons.background.active.tertiary};
            }
            &:focus-visible {
              outline: none;
              background: ${theme.colors.buttons.background.focused.tertiary};
              border: ${theme.spacingBase / 8}rem solid ${theme.colors.border.selected};
            }
            .mantine-DatePickerInput-calendarHeaderControlIcon {
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

          .mantine-DatePickerInput-weekdaysRow {
            block-size: ${5 * theme.spacingBase}rem;
            padding: 0;
          }

          .mantine-DatePickerInput-weekday {
            color: ${theme.colors.content.secondary};
            font-weight: ${theme.fontWeights.book};
          }

          .mantine-DatePickerInput-monthCell {
            padding: 0;
          }

          .mantine-DatePickerInput-day {
            block-size: ${5 * theme.spacingBase}rem;
            inline-size: ${4.5 * theme.spacingBase}rem;
            border-radius: ${theme.borderRadii.sm};
            margin-block-start: ${theme.spacingBase}rem;

            &[data-hidden] {
              display: none; // TODO: use hideOutsideDates instead when bug is fixed in Mantine
            }
            &[data-today] {
              color: ${theme.colors.content.positive};
            }
            &:hover {
              background: ${theme.colors.background.tertiary};
              color: ${theme.colors.content.primary};
            }
            &[data-selected] {
              background: ${theme.colors.background.primaryInverted};
              color: ${theme.colors.content.primaryInverted};

              &:focus-visible {
                background: ${theme.colors.background.primaryInverted};
                color: ${theme.colors.content.primaryInverted};
                text-decoration: underline;
              }
            }
            &:disabled {
              color: ${theme.colors.content.tertiary};
            }
            &:focus-visible {
              outline: none;
              background: ${theme.colors.background.tertiary};
              color: ${theme.colors.content.primary};
              outline: ${theme.spacingBase / 8}rem solid ${theme.colors.border.selected};
              text-decoration: underline;
            }
          }
        `}
      />
      <StyledDatePickerInput
        ariaLabels={{ previousMonth: "Previous month", nextMonth: "Next month" }}
        hasLabel={"label" in props}
        maxLevel="month"
        hideOutsideDates
        popoverProps={{
          clickOutsideEvents: ["pointerdown"], // to ensure popover is closed when clicking on a menu trigger
          withinPortal: false, // to ensure picker is usable within dialogs that traps focus – the picker will have `pointer-events: none` rendrered outside of the dialog
        }}
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
  .mantine-DatePickerInput-wrapper {
    position: relative;
  }
  .mantine-DatePickerInput-label {
    display: inline-block;
    line-height: calc(4 / 3);
    color: ${({ theme }) => theme.colors.content.secondary};
    padding-block-start: 5px;
    padding-block-end: 3px;
  }
  .mantine-DatePickerInput-input {
    background: ${({ theme }) => theme.colors.background.secondary};
    color: ${({ theme }) => theme.colors.content.primary};
    inline-size: 100%;
    min-inline-size: ${({ theme }) => 29 * theme.spacingBase}rem;
    display: block;
    text-align: start;
    block-size: ${({ theme }) => 6 * theme.spacingBase}rem;
    padding-inline: ${({ theme }) => 2 * theme.spacingBase}rem
      ${({ theme, clearable }) => (clearable ? 6 : 2) * theme.spacingBase}rem;
    border-radius: ${({ hasLabel, theme }) =>
      hasLabel ? theme.borderRadii.sm : theme.borderRadii.xl};

    &:hover {
      background: ${({ theme }) => theme.colors.background.tertiary};
    }
    .mantine-InputPlaceholder-placeholder {
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
    }
    &:disabled .mantine-DatePickerInput-placeholder {
      color: ${({ theme }) => theme.colors.content.tertiary};
    }
  }
  .mantine-DatePickerInput-section {
    position: absolute;
    inset-block: 0;
    inset-inline-end: ${({ theme }) => 1 * theme.spacingBase}rem;
    inline-size: ${({ theme }) => 3 * theme.spacingBase}rem;
    display: flex;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        display: none;
      }
      &::before {
        content: "❌";
      }
    }
  }
`
