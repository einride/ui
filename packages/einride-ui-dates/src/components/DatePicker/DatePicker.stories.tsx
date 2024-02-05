import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { DateTime } from "luxon"
import { ComponentProps, useState } from "react"
import { SnapshotWrapper } from "src/lib/storybook/SnapshotWrapper"
import { DatePicker } from "./DatePicker"

const meta = {
  component: DatePicker,
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

const defaultDate = DateTime.local(2024, 2, 4)
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

const ControlledTemplate = (args: ComponentProps<typeof DatePicker>): React.JSX.Element => {
  const { selected: argsValue } = args
  const [value, setValue] = useState<Date | undefined>(argsValue)
  return <DatePicker {...args} selected={value} onSelect={setValue} />
}

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    selected: defaultDate.toJSDate(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const selectedDate = canvas.getByRole("gridcell", {
      name: defaultDate.toFormat(datePickerDateFormat),
    })
    expect(selectedDate).toHaveAttribute("aria-selected", "true")
  },
} satisfies Story

export const Pointer = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    selected: defaultDate.toJSDate(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const currentDateButton = canvas.getByRole("gridcell", {
      name: defaultDate.toFormat(datePickerDateFormat),
    })
    await expect(currentDateButton.getAttribute("aria-selected")).toBe("true")
    const previousMonthButton = canvas.getByRole("button", { name: "Go to previous month" })
    await userEvent.click(previousMonthButton)
    const fourthDateInPreviousMonthButton = canvas.getByRole("gridcell", {
      name: "4",
    })
    await userEvent.click(fourthDateInPreviousMonthButton)
    await expect(fourthDateInPreviousMonthButton.getAttribute("aria-selected")).toBe("true")
  },
} satisfies Story

export const Keyboard = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    selected: defaultDate.toJSDate(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.tab()
    await expect(canvas.getByRole("button", { name: "Go to previous month" })).toHaveFocus()
    await userEvent.tab()
    await expect(canvas.getByRole("button", { name: "Go to next month" })).toHaveFocus()
    await userEvent.tab()
    const currentDateButton = canvas.getByRole("gridcell", {
      name: defaultDate.toFormat(datePickerDateFormat),
    })
    await expect(currentDateButton.getAttribute("aria-selected")).toBe("true")
    await userEvent.keyboard("[ArrowDown]")
    const eleventhDateButton = canvas.getByRole("gridcell", {
      name: "11",
    })
    await expect(eleventhDateButton).toHaveFocus()
    await userEvent.keyboard("[Enter]")
    await expect(eleventhDateButton.getAttribute("aria-selected")).toBe("true")
    await expect(currentDateButton.getAttribute("aria-selected")).not.toBe("true")
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Controlled].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <DatePicker key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies StoryObj
