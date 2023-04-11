import { DatesRangeValue } from "@mantine/dates"
import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { DateTime } from "luxon"
import { ComponentProps, useState } from "react"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { RangeCalendar } from "./RangeCalendar"

const meta = {
  component: RangeCalendar,
} satisfies Meta<typeof RangeCalendar>

export default meta
type Story = StoryObj<typeof meta>

const defaultDate = DateTime.local(2022, 8, 1)
const defaultEndDate = defaultDate.set({ day: 8 })
const today = DateTime.now()
const defaultDateFormat = "MMMM yyyy"
const mantineDateFormat = "d MMMM yyyy"

export const Basic = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const month = canvas.getByText(today.toFormat(defaultDateFormat))
    expect(month).toBeInTheDocument()
  },
} satisfies Story

export const DefaultDate = {
  args: {
    defaultDate: defaultDate.toJSDate(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const month = canvas.getByText(defaultDate.toFormat(defaultDateFormat))
    expect(month).toBeInTheDocument()
  },
} satisfies Story

export const DefaultValue = {
  args: {
    defaultDate: defaultDate.toJSDate(),
    defaultValue: [defaultDate.toJSDate(), defaultEndDate.toJSDate()],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const selectedDate = canvas.getByRole("button", {
      name: defaultDate.toFormat(mantineDateFormat),
    })
    await expect(selectedDate.getAttribute("data-selected")).toBe("true")
    const selectedEndDate = canvas.getByRole("button", {
      name: defaultEndDate.toFormat(mantineDateFormat),
    })
    await expect(selectedEndDate.getAttribute("data-selected")).toBe("true")
  },
} satisfies Story

const ControlledTemplate = (args: ComponentProps<typeof RangeCalendar>): JSX.Element => {
  const { value: argsValue } = args
  const [value, setValue] = useState<DatesRangeValue>(argsValue ?? [null, null])
  return <RangeCalendar {...args} value={value} onChange={setValue} />
}

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    defaultDate: defaultDate.toJSDate(),
    value: [defaultDate.toJSDate(), defaultEndDate.toJSDate()],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const selectedDate = canvas.getByRole("button", {
      name: defaultDate.toFormat(mantineDateFormat),
    })
    expect(selectedDate).toHaveAttribute("data-selected", "true")
  },
} satisfies Story

export const Pointer = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const firstDateInCurrentMonth = today.set({ day: 1 })
    const firstDateInCurrentMonthButton = canvas.getByRole("button", {
      name: firstDateInCurrentMonth.toFormat(mantineDateFormat),
    })
    await userEvent.click(firstDateInCurrentMonthButton)
    await expect(firstDateInCurrentMonthButton.getAttribute("data-selected")).toBe("true")
    const fourthDayInCurrentMonth = firstDateInCurrentMonth.set({ day: 4 })
    const fourthDayInCurrentMonthButton = canvas.getByRole("button", {
      name: fourthDayInCurrentMonth.toFormat(mantineDateFormat),
    })
    await userEvent.click(fourthDayInCurrentMonthButton)
    await expect(fourthDayInCurrentMonthButton.getAttribute("data-selected")).toBe("true")
    const previousMonthButton = canvas.getByRole("button", { name: "Previous month" })
    await userEvent.click(previousMonthButton)
    const firstDayInPreviousMonth = firstDateInCurrentMonth.minus({ month: 1 })
    const firstDayInPreviousMonthButton = canvas.getByRole("button", {
      name: firstDayInPreviousMonth.toFormat(mantineDateFormat),
    })
    await userEvent.click(firstDayInPreviousMonthButton)
    await expect(firstDayInPreviousMonthButton.getAttribute("data-selected")).toBe("true")
    const fourthDayInPreviousMonth = firstDayInPreviousMonth.set({ day: 4 })
    const fourthDayInLastMonthButton = canvas.getByRole("button", {
      name: fourthDayInPreviousMonth.toFormat(mantineDateFormat),
    })
    await userEvent.click(fourthDayInLastMonthButton)
    await expect(fourthDayInLastMonthButton.getAttribute("data-selected")).toBe("true")
  },
} satisfies Story

export const Keyboard = {
  args: {
    defaultDate: defaultDate.toJSDate(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.tab()
    await expect(canvas.getByRole("button", { name: "Previous month" })).toHaveFocus()
    await userEvent.tab()
    await expect(canvas.getByRole("button", { name: "Next month" })).toHaveFocus()
    await userEvent.tab()
    const startDateButton = canvas.getByRole("button", {
      name: defaultDate.toFormat(mantineDateFormat),
    })
    await expect(startDateButton).toHaveFocus()
    await userEvent.keyboard("[Enter]")
    await expect(startDateButton.getAttribute("data-selected")).toBe("true")
    await userEvent.keyboard("[ArrowDown]")
    const endDateButton = canvas.getByRole("button", {
      name: defaultEndDate.toFormat(mantineDateFormat),
    })
    await expect(endDateButton).toHaveFocus()
    await userEvent.keyboard("[Enter]")
    await expect(endDateButton.getAttribute("data-selected")).toBe("true")
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[DefaultDate, DefaultValue].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <RangeCalendar key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies StoryObj
