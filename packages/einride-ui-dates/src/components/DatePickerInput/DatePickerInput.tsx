import { Box, Caption, ContentColor, Icon, TextInput } from "@einride/ui"
import { Global, css, useTheme } from "@emotion/react"
import styled from "@emotion/styled"
import { DatePickerInput as MantineDatePickerInput } from "@mantine/dates"
import { ComponentPropsWithoutRef, ReactNode } from "react"
import { DayPicker, DayPickerSingleProps, SelectSingleEventHandler } from "react-day-picker"

export interface DatePickerInputBaseProps {
  /** Whether to allow clearing value or not. Default is `false`. */
  clearable?: boolean

  /** Controls disabled state. */
  disabled?: boolean

  /** Message shown below input field. Can be used together with `status` to show a success or error message. */
  message?: ReactNode

  /** Props passed to message element. */
  messageProps?: Omit<ComponentPropsWithoutRef<"span">, "color"> & { "data-testid"?: string }

  /** Placeholder, displayed when date is not selected. */
  placeholder?: string

  /** Controls required state. */
  required?: boolean

  /** Status of the input, controlling color and icon. */
  status?: Status | undefined

  /** The earliest day to start the month navigation. */
  fromDate?: Date

  /** The latest day to end the month navigation. */
  toDate?: Date

  /** The selected day. */
  selected?: Date | undefined

  /** Event fired when a day is selected. */
  onSelect?: SelectSingleEventHandler

  /** Props passed to root element. */
  wrapperProps?: ComponentPropsWithoutRef<typeof Box>

  /** `dayjs` input format. Default is `YYYY-MM-DD`. */
  inputFormat?: string
}

const IconArrowLeft = (): React.JSX.Element => {
  return <Icon name="arrowLeft" />
}

const IconArrowRight = (): React.JSX.Element => {
  return <Icon name="arrowRight" />
}

interface DatePickerInputWithLabelProps {
  /** Date picker label, displayed before date picker. */
  label: ReactNode
}

interface DatePickerInputWithoutLabelProps {
  /** Accessible name, required when `label` is not provided. */
  "aria-label": string
}

export type DatePickerProps = DatePickerInputBaseProps &
  (DatePickerInputWithLabelProps | DatePickerInputWithoutLabelProps)

export const DatePickerInput = ({
  message,
  messageProps,
  status,
  wrapperProps,
  inputFormat = "YYYY-MM-DD",
  ...props
}: DatePickerProps): React.JSX.Element => {
  const theme = useTheme()

  const datePickerProps: DayPickerSingleProps = {
    mode: "single",
    ...props,
  }

  if (props.selected) {
    datePickerProps.defaultMonth = props.selected
  }

  return (
    <Box {...wrapperProps}>
      <Global
        styles={css`
          .rdp {
            --rdp-cell-size: ${5 * theme.spacingBase}rem; /* Size of the day cells. */
            --rdp-caption-font-size: inherit; /* Font size for the caption labels. */
            --rdp-accent-color: ${theme.colors.background
              .primaryInverted}; /* Accent color for the background of selected days. */
            --rdp-background-color: ${theme.colors.background
              .tertiary}; /* Background color for the hovered/focused elements. */
            --rdp-accent-color-dark: ${theme.colors.background
              .primaryInverted}; /* Accent color for the background of selected days (to use in dark-mode). */
            --rdp-background-color-dark: ${theme.colors.background
              .tertiary}; /* Background color for the hovered/focused elements (to use in dark-mode). */
            --rdp-outline: 1px solid var(--rdp-accent-color); /* Outline border for focused elements */
            --rdp-outline-selected: 1px solid var(--rdp-accent-color); /* Outline border for focused _and_ selected elements */
            --rdp-selected-color: ${theme.colors.content
              .primaryInverted}; /* Color of selected day text */
            margin: 0;
          }
        `}
      />
      <NewStyledCalender
        ISOWeek
        components={{
          IconLeft: IconArrowLeft,
          IconRight: IconArrowRight,
        }}
        {...datePickerProps}
      />
      {/* <StyledDatePickerInput
        ariaLabels={{ previousMonth: "Previous month", nextMonth: "Next month" }}
        hasLabel={"label" in props}
        hideOutsideDates
        maxLevel="month"
        popoverProps={{
          clickOutsideEvents: ["pointerdown"], // to ensure popover is closed when clicking on a menu trigger
          withinPortal: false, // to ensure picker is usable within dialogs that traps focus – the picker will have `pointer-events: none` rendrered outside of the dialog
        }}
        valueFormat={inputFormat}
        withAsterisk={false}
        withCellSpacing={false}
        unstyled
        {...props}
      /> */}
      {message && (
        <Caption color={getMessageColor(status)} {...messageProps}>
          {message}
        </Caption>
      )}
    </Box>
  )
}

type Status = ComponentPropsWithoutRef<typeof TextInput>["status"]

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

const NewStyledCalender = styled(DayPicker)`
  .rdp-table {
    border-collapse: separate;
    border-spacing: ${({ theme }) => 1 * theme.spacingBase}rem;
  }

  .rdp-month {
    background: ${({ theme }) => theme.colors.background.secondaryElevated};
    border-radius: ${({ theme }) => theme.borderRadii.lg};
    padding: ${({ theme }) => 2 * theme.spacingBase}rem ${({ theme }) => 1 * theme.spacingBase}rem;
  }

  .rdp-caption {
    margin-bottom: ${({ theme }) => 2 * theme.spacingBase}rem;
  }

  .rdp-caption_label {
    font-weight: normal;
  }

  .rdp-button {
    &:focus-visible {
      text-decoration: underline;
    }
  }

  .rdp-nav {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => 1 * theme.spacingBase}rem;
  }

  .rdp-nav_button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.colors.buttons.background.tertiary};
    color: ${({ theme }) => theme.colors.content.primary};
    border-radius: ${({ theme }) => theme.borderRadii.full};
    block-size: ${({ theme }) => 6 * theme.spacingBase}rem;
    inline-size: ${({ theme }) => 6 * theme.spacingBase}rem;

    &:hover {
      background: ${({ theme }) => theme.colors.buttons.background.hover.tertiary};
    }

    &:focus-visible {
      text-decoration: none;
    }
  }

  .rdp-head_cell {
    color: ${({ theme }) => theme.colors.content.secondary};
    font-weight: ${({ theme }) => theme.fontWeights.book};
    font-size: inherit;
    text-transform: none;
  }

  .rdp-cell {
    width: auto;
    height: auto;
  }

  .rdp-day {
    border-radius: ${({ theme }) => theme.borderRadii.sm};
    width: ${({ theme }) => 4 * theme.spacingBase}rem;
    height: ${({ theme }) => 5 * theme.spacingBase}rem;
    max-width: none;
  }

  .rdp-day_selected {
    &:focus-visible {
      outline-offset: 0;
      background-color: var(--rdp-accent-color);
      color: var(--rdp-selected-color);
    }
  }

  .rdp-day_today {
    font-weight: normal;
    color: ${({ theme }) => theme.colors.content.positive};
    text-decoration: underline;
  }
`

const StyledDatePickerInput = styled(MantineDatePickerInput, {
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
