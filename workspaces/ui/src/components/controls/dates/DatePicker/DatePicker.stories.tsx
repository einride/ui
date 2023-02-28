import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory, ComponentStoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { DateTime } from "luxon"
import { useState } from "react"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { DatePicker } from "./DatePicker"

const DATE_FORMAT = "yyyy-MM-dd"

export default {
  title: "Controls/Dates/DatePicker",
  component: DatePicker,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} satisfies ComponentMeta<typeof DatePicker>

type Story = ComponentStoryObj<typeof DatePicker>

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
    defaultValue: new Date(2023, 1, 9),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Label" })
    await expect(input).toHaveValue(DateTime.local(2023, 2, 9).toFormat(DATE_FORMAT))
  },
} satisfies Story

export const USFormat = {
  args: {
    ...WithLabel.args,
    inputFormat: "MM/DD/YYYY",
    defaultValue: new Date(2023, 1, 9),
  },
} satisfies Story

const ControlledTemplate: ComponentStory<typeof DatePicker> = (args) => {
  const [value, setValue] = useState<Date | null>(null)
  return <DatePicker {...args} value={value} onChange={setValue} />
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

export const AllowFreeInput = {
  args: {
    ...WithLabel.args,
    allowFreeInput: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Label" })
    await userEvent.type(input, "2023-03-06", { delay: 10 })
    await userEvent.keyboard("[Enter]")
    await expect(input).toHaveValue("2023-03-06")
  },
} satisfies Story

export const Mouse = {
  args: {
    ...WithLabel.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Label" })
    await expect(input).toHaveValue("")
    await userEvent.click(input)
    const firstDayInCurrentMonthButton = canvas.getByRole("button", { name: "1" })
    await userEvent.click(firstDayInCurrentMonthButton)
    const firstDayInCurrentMonth = DateTime.now().set({ day: 1 })
    await expect(input).toHaveValue(firstDayInCurrentMonth.toFormat(DATE_FORMAT))
    await userEvent.click(input)
    const previousMonthButton = canvas.getAllByRole("button")[0]
    await userEvent.click(previousMonthButton)
    const firstDayInLastMonthButton = canvas.getByRole("button", { name: "1" })
    await userEvent.click(firstDayInLastMonthButton)
    const firstDayInLastMonth = DateTime.now().set({ day: 1 }).minus({ month: 1 })
    await expect(input).toHaveValue(firstDayInLastMonth.toFormat(DATE_FORMAT))
  },
} satisfies Story

export const Keyboard = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...WithLabel.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Label" })
    await expect(input).toHaveValue("")
    await expect(input).not.toHaveFocus()
    await userEvent.tab()
    await expect(input).toHaveFocus()
    await userEvent.keyboard("[Enter]")
    await userEvent.keyboard("[Enter]")
    const firstDayInCurrentMonth = DateTime.now().set({ day: 1 })
    await expect(input).toHaveValue(firstDayInCurrentMonth.toFormat(DATE_FORMAT))
    await userEvent.keyboard("[Enter]")
    await userEvent.tab()
    await userEvent.keyboard("[Enter]")
    const firstDayInLastMonthButton = canvas.getByRole("button", { name: "1" })
    await userEvent.click(firstDayInLastMonthButton) // until keyboard navigation is fixed in Mantine component
    const firstDayInLastMonth = DateTime.now().set({ day: 1 }).minus({ month: 1 })
    await expect(input).toHaveValue(firstDayInLastMonth.toFormat(DATE_FORMAT))
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[WithLabel, WithoutLabel, DefaultValue, USFormat, Message, SuccessMessage, ErrorMessage].map(
        (Story, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <DatePicker key={index} {...Story.args} />
        ),
      )}
    </SnapshotWrapper>
  ),
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Story
