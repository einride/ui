import { CalendarDate, createCalendar, DateValue } from "@internationalized/date"
import { useCalendar } from "@react-aria/calendar"
import { useLocale } from "@react-aria/i18n"
import { useCalendarState } from "@react-stately/calendar"
import { forwardRef } from "react"
import { Box } from "../../../layout/Box/Box"
import { Group } from "../../../layout/Group/Group"
import { Paragraph } from "../../../typography/Paragraph/Paragraph"
import { CalendarGrid } from "../CalendarGrid"
import { NextButton } from "../NextButton"
import { PreviousButton } from "../PreviousButton"

interface CalendarProps {
  /** Accessible name. */
  "aria-label": string

  /** Default calendar value when uncontrolled. */
  defaultValue?: CalendarDate

  /** Controlled calendar value. */
  value?: CalendarDate

  /** Event handler called when the value of the calendar changes. */
  onChange?: (value: CalendarDate) => void
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>((props, ref): JSX.Element => {
  const { locale } = useLocale()
  const state = useCalendarState({
    ...props,
    onChange: props.onChange as (value: DateValue) => void,
    locale,
    createCalendar,
  })
  const { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(props, state)

  return (
    <Box
      background="secondary"
      borderRadius="lg"
      display="flex"
      flexDirection="column"
      gap="sm"
      padding={2}
      width={40}
      {...calendarProps}
      ref={ref}
    >
      <Group alignItems="center" justifyContent="space-between">
        <Paragraph>{title}</Paragraph>
        <Group gap="xs">
          <PreviousButton {...prevButtonProps} />
          <NextButton {...nextButtonProps} />
        </Group>
      </Group>
      <CalendarGrid state={state} />
    </Box>
  )
})
