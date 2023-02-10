import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory, ComponentStoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { DateTime } from "luxon"
import { ComponentProps, useState } from "react"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { DateRangePicker, DateRangePickerValue } from "./DateRangePicker"

const DATE_FORMAT = "yyyy-MM-dd"

export default {
  title: "Controls/Dates/DateRangePicker",
  component: DateRangePicker,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} satisfies ComponentMeta<typeof DateRangePicker>

type Story = ComponentStoryObj<typeof DateRangePicker>

export const WithLabel = {
  args: {
    label: "Label",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Label" })
    await expect(input).toHaveValue("")
  },
} satisfies Story

export const WithoutLabel = {
  args: {
    "aria-label": "Label",
    placeholder: "Placeholder",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Label" })
    await expect(input).toHaveValue("")
  },
} satisfies Story

export const DefaultValue = {
  args: {
    ...WithLabel.args,
    defaultValue: [new Date(2023, 1, 1), new Date(2023, 1, 10)],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Label" })
    const firstDayInCurrentMonth = DateTime.now().set({ day: 1 })
    const tenthDayInCurrentMonth = DateTime.now().set({ day: 10 })
    await expect(input).toHaveValue(
      `${firstDayInCurrentMonth.toFormat(DATE_FORMAT)} – ${tenthDayInCurrentMonth.toFormat(
        DATE_FORMAT,
      )}`,
    )
  },
} satisfies Story

export const USFormat = {
  args: {
    ...WithLabel.args,
    inputFormat: "MM/DD/YYYY",
    defaultValue: [new Date(2023, 1, 9), new Date(2023, 1, 9)],
  },
} satisfies Story

const ControlledTemplate: ComponentStory<typeof DateRangePicker> = (args) => {
  const [value, setValue] = useState<DateRangePickerValue>([null, null])
  return <DateRangePicker {...args} value={value} onChange={setValue} />
}

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...WithLabel.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Label" })
    await expect(input).toHaveValue("")
  },
} satisfies Story

export const Message = {
  args: {
    ...WithLabel.args,
    message: "Message",
  },
} satisfies Story

export const SuccessMessage = {
  args: {
    ...WithLabel.args,
    message: "Success message",
    status: "success",
  },
} satisfies Story

export const ErrorMessage = {
  args: {
    ...WithLabel.args,
    message: "Error message",
    status: "fail",
  },
} satisfies Story

export const Mouse = {
  args: {
    ...WithLabel.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Label" })
    const firstDayInCurrentMonth = DateTime.now().set({ day: 1 })
    const fourthDayInCurrentMonth = DateTime.now().set({ day: 4 })
    await expect(input).toHaveValue("")
    await userEvent.click(input)
    const firstDayInCurrentMonthButton = canvas.getByRole("button", { name: "1" })
    await userEvent.click(firstDayInCurrentMonthButton)
    const fourthDayInCurrentMonthButton = canvas.getByRole("button", { name: "4" })
    await userEvent.click(fourthDayInCurrentMonthButton)
    await expect(input).toHaveValue(
      `${firstDayInCurrentMonth.toFormat(DATE_FORMAT)} – ${fourthDayInCurrentMonth.toFormat(
        DATE_FORMAT,
      )}`,
    )
    await userEvent.click(input)
    const previousMonthButton = canvas.getAllByRole("button")[0]
    await userEvent.click(previousMonthButton)
    const firstDayInLastMonthButton = canvas.getByRole("button", { name: "1" })
    await userEvent.click(firstDayInLastMonthButton)
    const fourthDayInLastMonthButton = canvas.getByRole("button", { name: "4" })
    await userEvent.click(fourthDayInLastMonthButton)
    const firstDayInLastMonth = DateTime.now().set({ day: 1 }).minus({ month: 1 })
    const fourthDayInLastMonth = DateTime.now().set({ day: 4 }).minus({ month: 1 })
    await expect(input).toHaveValue(
      `${firstDayInLastMonth.toFormat(DATE_FORMAT)} – ${fourthDayInLastMonth.toFormat(
        DATE_FORMAT,
      )}`,
    )
  },
} satisfies Story

export const Keyboard = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...WithLabel.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox")
    const firstDayInCurrentMonth = DateTime.now().set({ day: 1 })
    await expect(input).toHaveValue("")
    await expect(input).not.toHaveFocus()
    await userEvent.tab()
    await expect(input).toHaveFocus()
    await userEvent.keyboard("[Enter]")
    await userEvent.keyboard("[Enter]")
    await userEvent.keyboard("[ArrowDown]")
    await userEvent.keyboard("[Enter]")
    const eighthDayInCurrentMonth = DateTime.now().set({ day: 8 })
    await expect(input).toHaveValue(
      `${firstDayInCurrentMonth.toFormat(DATE_FORMAT)} – ${eighthDayInCurrentMonth.toFormat(
        DATE_FORMAT,
      )}`,
    )
    await userEvent.keyboard("[Enter]")
    await userEvent.tab()
    await userEvent.keyboard("[Enter]")
    const firstDayInLastMonthButton = canvas.getByRole("button", { name: "1" })
    await userEvent.click(firstDayInLastMonthButton) // until keyboard navigation is fixed in Mantine component
    await userEvent.keyboard("[ArrowDown]")
    await userEvent.keyboard("[Enter]")
    const firstDayInLastMonth = DateTime.now().set({ day: 1 }).minus({ month: 1 })
    const eighthDayInLastMonth = DateTime.now().set({ day: 8 }).minus({ month: 1 })
    await expect(input).toHaveValue(
      `${firstDayInLastMonth.toFormat(DATE_FORMAT)} – ${eighthDayInLastMonth.toFormat(
        DATE_FORMAT,
      )}`,
    )
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[WithLabel, WithoutLabel, DefaultValue, USFormat, Message, SuccessMessage, ErrorMessage].map(
        (Story, index) => (
          <DateRangePicker
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            {...(Story.args as ComponentProps<typeof DateRangePicker>)}
          />
        ),
      )}
    </SnapshotWrapper>
  ),
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Story
