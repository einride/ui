import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { DateTime } from "luxon"
import { ComponentProps, useState } from "react"
import { DateRange } from "react-day-picker"
import { DateRangePicker } from "./DateRangePicker"

const meta = {
  component: DateRangePicker,
} satisfies Meta<typeof DateRangePicker>

export default meta
type Story = StoryObj<typeof meta>

const defaultDate = DateTime.local(2022, 9, 5)
const defaultEndDate = defaultDate.set({ day: 8 })
const today = DateTime.now()
const defaultDateFormat = "MMMM yyyy"
const datePickerDateFormat = "d"

export const Basic = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const month = canvas.getByText(today.toFormat(defaultDateFormat))
    expect(month).toBeInTheDocument()
  },
} satisfies Story

const ControlledTemplate = (args: ComponentProps<typeof DateRangePicker>): React.JSX.Element => {
  const { selected: argsValue } = args
  const [value, setValue] = useState<DateRange | undefined>(argsValue)

  return <DateRangePicker {...args} selected={value} onSelect={setValue} />
}

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    selected: { from: defaultDate.toJSDate(), to: defaultEndDate.toJSDate() },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const selectedDate = canvas.getByRole("gridcell", {
      name: defaultDate.toFormat(datePickerDateFormat),
    })
    expect(selectedDate).toHaveAttribute("data-selected", "true")
  },
} satisfies Story
