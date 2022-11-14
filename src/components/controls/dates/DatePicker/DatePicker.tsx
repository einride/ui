import { CalendarDate, DateValue } from "@internationalized/date"
import { useClickOutside } from "@mantine/hooks"
import { AriaButtonProps, useButton } from "@react-aria/button"
import { useDatePicker } from "@react-aria/datepicker"
import { DatePickerStateOptions, useDatePickerState } from "@react-stately/datepicker"
import { ComponentPropsWithoutRef, LabelHTMLAttributes, ReactNode, useRef } from "react"
import { BackgroundColor } from "../../../../lib/theme/types"
import { Group } from "../../../layout/Group/Group"
import { Stack } from "../../../layout/Stack/Stack"
import { IconButton } from "../../buttons/IconButton/IconButton"
import { Calendar } from "../Calendar/Calendar"
import { DateInput } from "../DateInput/DateInput"

export interface DatePickerBaseProps {
  /** Background color of the input field. Default is `secondary`. */
  background?: BackgroundColor

  /** Default date picker value when uncontrolled. */
  defaultValue?: CalendarDate

  /** Controlled date picker value. */
  value?: CalendarDate

  /** Event handler called when the value of the date picker changes. */
  onChange?: (value: CalendarDate) => void

  /** Props passed to root element. */
  wrapperProps?: Omit<ComponentPropsWithoutRef<"div">, "color">
}

interface DatePickerWithLabelProps {
  /** Picker label, displayed before Pickert. */
  label: ReactNode

  /** Props passed to label element. */
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>
}

interface DatePickerWithoutLabelProps {
  /** Accessible name, required when `label` is not provided. */
  "aria-label": string
}

type DatePickerProps = DatePickerBaseProps &
  (DatePickerWithLabelProps | DatePickerWithoutLabelProps)

export const DatePicker = ({ wrapperProps, ...props }: DatePickerProps): JSX.Element => {
  const stateProps: DatePickerStateOptions = {
    defaultValue: props.defaultValue as DateValue,
    onChange: props.onChange as (value: DateValue) => void,
    value: props.value as DateValue,
  }
  const state = useDatePickerState(stateProps)
  const ref = useRef<HTMLDivElement>(null)
  const { groupProps, labelProps, fieldProps, buttonProps, calendarProps } = useDatePicker(
    props,
    state,
    ref,
  )
  const calendarRef = useClickOutside(() => state.setOpen(false))
  return (
    <Stack position="relative" gap="xs" {...wrapperProps}>
      <Group alignItems="end" gap="xs" {...groupProps} ref={ref}>
        <DateInput
          aria-label={"aria-label" in props && props["aria-label"]}
          label={"label" in props && props.label}
          labelProps={labelProps}
          {...fieldProps}
          defaultValue={props.defaultValue as CalendarDate}
          value={props.value as CalendarDate}
        />
        <CalendarButton {...buttonProps} />
      </Group>
      {state.isOpen && (
        <Calendar
          ref={calendarRef}
          aria-label="asd"
          {...calendarProps}
          defaultValue={props.defaultValue as CalendarDate}
          value={props.value as CalendarDate}
        />
      )}
    </Stack>
  )
}

export const CalendarButton = (props: AriaButtonProps<"button">): JSX.Element => {
  const ref = useRef<HTMLButtonElement>(null)
  const { buttonProps } = useButton(props, ref)
  return <IconButton icon="ellipsis" {...buttonProps} ref={ref} aria-label="Next month" />
}
