import { createCalendar, DateValue } from "@internationalized/date"
import { CalendarProps, useCalendar } from "@react-aria/calendar"
import { useLocale } from "@react-aria/i18n"
import { useCalendarState } from "@react-stately/calendar"
import { Box } from "../../../layout/Box/Box"
import { Group } from "../../../layout/Group/Group"
import { Paragraph } from "../../../typography/Paragraph/Paragraph"
import { CalendarGrid } from "../CalendarGrid"
import { NextButton } from "../NextButton"
import { PreviousButton } from "../PreviousButton"

export const Calendar = (props: CalendarProps<DateValue>): JSX.Element => {
  const { locale } = useLocale()
  const state = useCalendarState({
    ...props,
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
}
