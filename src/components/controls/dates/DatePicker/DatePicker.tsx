import { CalendarDate } from "@internationalized/date"
import { useClickOutside } from "@mantine/hooks"
import { useDatePicker } from "@react-aria/datepicker"
import { useDatePickerState } from "@react-stately/datepicker"
import { ComponentPropsWithoutRef, ReactNode, useRef } from "react"
import { Box, BoxProps } from "../../../layout/Box/Box"
import { Calendar } from "../Calendar/Calendar"
import { DateInput } from "../DateInput/DateInput"

interface DatePickerBaseProps {
  /** Controlled date picker value. */
  value: CalendarDate

  /** Event handler called when the value of the date picker changes. */
  onChange: (value: CalendarDate) => void

  /** Props passed to root element. */
  wrapperProps: BoxProps
}

interface DatePickerWithLabelProps {
  /** Date picker label, displayed before date picker. */
  label: ReactNode

  /** Props passed to label element. */
  labelProps?: ComponentPropsWithoutRef<"label">
}

interface DatePickerWithoutLabelProps {
  /** Accessible name, required when `label` is not provided. */
  "aria-label": string
}

export type DatePickerProps = DatePickerBaseProps &
  (DatePickerWithLabelProps | DatePickerWithoutLabelProps)

export const DatePicker = ({ wrapperProps, ...props }: DatePickerProps): JSX.Element => {
  const state = useDatePickerState(props)
  const ref = useRef<HTMLDivElement>(null)
  const { labelProps, fieldProps, calendarProps } = useDatePicker(props, state, ref)
  const calendarRef = useClickOutside(() => state.setOpen(false))

  const handleClick = (): void => {
    state.setOpen(true)
  }

  return (
    <Box {...wrapperProps} display="flex" flexDirection="column" gap="sm">
      <Box data-asd="q2">
        <DateInput
          {...props}
          labelProps={labelProps}
          wrapperProps={{ onClick: handleClick }}
          {...fieldProps}
        />
      </Box>
      {state.isOpen && (
        <Calendar
          aria-label={"aria-label" in props ? props["aria-label"] : ""}
          onChange={calendarProps.onChange as (value: CalendarDate) => void}
          value={calendarProps.value as CalendarDate}
          ref={calendarRef}
        />
      )}
    </Box>
  )
}
