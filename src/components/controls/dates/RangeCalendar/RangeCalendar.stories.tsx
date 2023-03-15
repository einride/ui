import { DatesRangeValue } from "@mantine/dates"
import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory, ComponentStoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { DateTime } from "luxon"
import { ComponentProps, useState } from "react"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { RangeCalendar } from "./RangeCalendar"

export default {
  title: "Controls/Dates/RangeCalendar",
  component: RangeCalendar,
} satisfies ComponentMeta<typeof RangeCalendar>

type Story = ComponentStoryObj<typeof RangeCalendar>

const defaultDate = DateTime.local(2023, 1, 1)
const defaultEndDate = DateTime.local(2023, 1, 5)
const today = DateTime.now()
const defaultDateFormat = "MMMM yyyy"
const mantineDateFormat = "d MMMM yyyy"

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

const ControlledTemplate: ComponentStory<typeof RangeCalendar> = (args) => {
  const { value: argsValue } = args
  const [value, setValue] = useState<DatesRangeValue>(argsValue)
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

export const Mouse = {
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.tab()
    await userEvent.tab()
    await userEvent.tab()
    const firstDayInCurrentMonth = DateTime.now().set({ day: 1 })
    const firstDayInCurrentMonthButton = canvas.getByRole("button", {
      name: firstDayInCurrentMonth.toFormat(mantineDateFormat),
    })
    await expect(firstDayInCurrentMonthButton).toHaveFocus()
    await userEvent.keyboard("[Enter]")
    await expect(firstDayInCurrentMonthButton.getAttribute("data-selected")).toBe("true")
    await userEvent.keyboard("[ArrowDown]")
    const eighthDayInCurrentMonth = firstDayInCurrentMonth.set({ day: 8 })
    const eighthDayInCurrentMonthButton = canvas.getByRole("button", {
      name: eighthDayInCurrentMonth.toFormat(mantineDateFormat),
    })
    await expect(eighthDayInCurrentMonthButton).toHaveFocus()
    await userEvent.keyboard("[Enter]")
    await expect(firstDayInCurrentMonthButton.getAttribute("data-selected")).toBe("true")
    await expect(eighthDayInCurrentMonthButton.getAttribute("data-selected")).toBe("true")
    await userEvent.keyboard("[ArrowUp]")
    await userEvent.tab({ shift: true })
    await userEvent.tab({ shift: true })
    const previousMonthButton = canvas.getAllByRole("button")[0]
    await expect(previousMonthButton).toHaveFocus()
    await userEvent.keyboard("[Enter]")
    const firstDayInPreviousMonth = firstDayInCurrentMonth.minus({ month: 1 })
    const firstDayInPreviousMonthButton = canvas.getByRole("button", {
      name: firstDayInPreviousMonth.toFormat(mantineDateFormat),
    })
    await userEvent.tab()
    await userEvent.tab()
    await userEvent.keyboard("[Enter]")
    await expect(firstDayInPreviousMonthButton.getAttribute("data-selected")).toBe("true")
    const eightDayInPreviousMonth = firstDayInPreviousMonth.set({ day: 8 })
    const eighthDayInLastMonthButton = canvas.getByRole("button", {
      name: eightDayInPreviousMonth.toFormat(mantineDateFormat),
    })
    await userEvent.keyboard("[ArrowDown]")
    await userEvent.keyboard("[Enter]")
    await expect(firstDayInPreviousMonthButton.getAttribute("data-selected")).toBe("true")
    await expect(eighthDayInLastMonthButton.getAttribute("data-selected")).toBe("true")
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[DefaultDate, DefaultValue].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <RangeCalendar key={index} {...(Story.args as ComponentProps<typeof RangeCalendar>)} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Story
