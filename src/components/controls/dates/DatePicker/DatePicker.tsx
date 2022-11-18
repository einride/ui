import styled from "@emotion/styled"
import { CalendarDate } from "@internationalized/date"
import { AriaDatePickerProps, useDatePicker } from "@react-aria/datepicker"
import { useDatePickerState } from "@react-stately/datepicker"
import { ReactNode, useRef } from "react"
import { Box, BoxProps } from "../../../layout/Box/Box"
import { Stack } from "../../../layout/Stack/Stack"
import { Calendar } from "../Calendar/Calendar"
import { DateInput } from "../DateInput/DateInput"
import { Dialog } from "../Dialog"
import { Popover } from "../Popover"

interface DatePickerBaseProps extends AriaDatePickerProps<CalendarDate> {
  /** Props passed to root element. */
  wrapperProps?: BoxProps
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
  const state = useDatePickerState({
    ...props,
    shouldCloseOnSelect: false,
  })
  const ref = useRef<HTMLDivElement>(null)
  const { groupProps, labelProps, fieldProps, dialogProps, buttonProps, calendarProps } =
    useDatePicker(props, state, ref)
  return (
    <Box display="inline-flex" flexDirection="column">
      {"label" in props && <StyledLabel {...labelProps}>{props.label}</StyledLabel>}
      <Stack gap="lg">
        <Box {...groupProps} ref={ref} onClick={() => state.setOpen(true)}>
          <DateInput hasLabel={"label" in props} buttonProps={buttonProps} {...fieldProps} />
        </Box>
        {state.isOpen && (
          <Popover triggerRef={ref} state={state}>
            <Dialog {...dialogProps}>
              <Calendar {...calendarProps} aria-label="" />
            </Dialog>
          </Popover>
        )}
      </Stack>
    </Box>
  )
}

const StyledLabel = styled.label`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.book};
  line-height: calc(4 / 3);
  margin-block-start: 5px;
  margin-block-end: 3px;
  color: ${({ theme }) => theme.colors.content.secondary};
`
