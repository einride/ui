import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory, ComponentStoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { DateTime } from "luxon"
import { ComponentProps, useState } from "react"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { Calendar } from "./Calendar"

export default {
  title: "Controls/Dates/Calendar",
  component: Calendar,
} satisfies ComponentMeta<typeof Calendar>

type Story = ComponentStoryObj<typeof Calendar>

const defaultDate = DateTime.local(2023, 1, 1)
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
    defaultValue: defaultDate.toJSDate(),
    defaultDate: defaultDate.toJSDate(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const selectedDate = canvas.getByRole("button", {
      name: defaultDate.toFormat(mantineDateFormat),
    })
    expect(selectedDate).toHaveAttribute("data-selected", "true")
  },
} satisfies Story

const ControlledTemplate: ComponentStory<typeof Calendar> = (args) => {
  const { value: argsValue } = args
  const [value, setValue] = useState<Date | null>(argsValue)
  return <Calendar {...args} value={value} onChange={setValue} />
}

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    defaultDate: defaultDate.toJSDate(),
    value: defaultDate.toJSDate(),
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
  args: {
    defaultValue: today.toJSDate(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const currentDateButton = canvas.getByRole("button", {
      name: today.toFormat(mantineDateFormat),
    })
    await expect(currentDateButton.getAttribute("data-selected")).toBe("true")
    const previousMonthButton = canvas.getByRole("button", { name: "Previous month" })
    await userEvent.click(previousMonthButton)
    const fourthDateInPreviousMonthButton = canvas.getByRole("button", {
      name: today.minus({ month: 1 }).set({ day: 4 }).toFormat(mantineDateFormat),
    })
    await userEvent.click(fourthDateInPreviousMonthButton)
    await expect(fourthDateInPreviousMonthButton.getAttribute("data-selected")).toBe("true")
  },
} satisfies Story

export const Keyboard = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.tab()
    await userEvent.tab()
    await userEvent.tab()
    const firstDayInCurrentMonthButton = canvas.getByRole("button", {
      name: today.set({ day: 1 }).toFormat(mantineDateFormat),
    })
    await expect(firstDayInCurrentMonthButton).toHaveFocus()
    await userEvent.keyboard("[Enter]")
    await expect(firstDayInCurrentMonthButton.getAttribute("data-selected")).toBe("true")
    await userEvent.keyboard("[ArrowDown]")
    const eighthDayInCurrentMonthButton = canvas.getByRole("button", {
      name: today.set({ day: 8 }).toFormat(mantineDateFormat),
    })
    await expect(eighthDayInCurrentMonthButton).toHaveFocus()
    await userEvent.keyboard("[Enter]")
    await expect(eighthDayInCurrentMonthButton.getAttribute("data-selected")).toBe("true")
    await expect(firstDayInCurrentMonthButton.getAttribute("data-selected")).not.toBe("true")
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[DefaultDate, DefaultValue, Controlled].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Calendar key={index} {...(Story.args as ComponentProps<typeof Calendar>)} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Story
