import styled from "@emotion/styled"
import { getWeeksInMonth } from "@internationalized/date"
import { useCalendarGrid } from "@react-aria/calendar"
import { useLocale } from "@react-aria/i18n"
import { CalendarState } from "@react-stately/calendar"
import { Box } from "../../layout/Box/Box"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { CalendarCell } from "./CalendarCell"

interface CalendarGridProps {
  state: CalendarState
}

export const CalendarGrid = ({ state, ...props }: CalendarGridProps): JSX.Element => {
  const { locale } = useLocale()
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state)
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale)

  return (
    <Table {...gridProps}>
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Paragraph as="th" color="secondary" key={index}>
              {day}
            </Paragraph>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <Box as="tr" height={5} key={weekIndex}>
            {state.getDatesInWeek(weekIndex).map((date, index) =>
              // eslint-disable-next-line react/no-array-index-key, react/jsx-no-undef
              date ? <CalendarCell key={index} state={state} date={date} /> : <td key={index} />,
            )}
          </Box>
        ))}
      </tbody>
    </Table>
  )
}

const Table = styled.table`
  border-collapse: separate;
  border-spacing: ${({ theme }) => theme.spacingBase}rem;
`
