import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { DateTime } from "luxon"
import { useState } from "react"
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
} as ComponentMeta<typeof DateRangePicker>

const Template: ComponentStory<typeof DateRangePicker> = (args) => <DateRangePicker {...args} />

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: "Label",
}
WithLabel.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox", { name: "Label" })
  await expect(input).toHaveValue("")
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  "aria-label": "Label",
  placeholder: "Placeholder",
}
WithoutLabel.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox", { name: "Label" })
  await expect(input).toHaveValue("")
}

export const DefaultValue = Template.bind({})
DefaultValue.args = {
  ...WithLabel.args,
  defaultValue: [new Date(new Date().setDate(1)), new Date(new Date().setDate(10))],
}
DefaultValue.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox", { name: "Label" })
  const firstDayInCurrentMonth = DateTime.now().set({ day: 1 })
  const tenthDayInCurrentMonth = DateTime.now().set({ day: 10 })
  await expect(input).toHaveValue(
    `${firstDayInCurrentMonth.toFormat(DATE_FORMAT)} – ${tenthDayInCurrentMonth.toFormat(
      DATE_FORMAT,
    )}`,
  )
}

const ControlledTemplate: ComponentStory<typeof DateRangePicker> = (args) => {
  const [value, setValue] = useState<DateRangePickerValue>([null, null])
  return <DateRangePicker {...args} value={value} onChange={setValue} />
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  ...WithLabel.args,
}
Controlled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox", { name: "Label" })
  await expect(input).toHaveValue("")
}

export const Message = Template.bind({})
Message.args = {
  ...WithLabel.args,
  message: "Message",
}

export const SuccessMessage = Template.bind({})
SuccessMessage.args = {
  ...WithLabel.args,
  message: "Success message",
  status: "success",
}

export const ErrorMessage = Template.bind({})
ErrorMessage.args = {
  ...WithLabel.args,
  message: "Error message",
  status: "fail",
}

export const Mouse = Template.bind({})
Mouse.args = {
  ...WithLabel.args,
}
Mouse.play = async ({ canvasElement }) => {
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
    `${firstDayInLastMonth.toFormat(DATE_FORMAT)} – ${fourthDayInLastMonth.toFormat(DATE_FORMAT)}`,
  )
}

export const Keyboard = ControlledTemplate.bind({})
Keyboard.args = {
  ...WithLabel.args,
}
Keyboard.play = async ({ canvasElement }) => {
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
    `${firstDayInLastMonth.toFormat(DATE_FORMAT)} – ${eighthDayInLastMonth.toFormat(DATE_FORMAT)}`,
  )
}
