import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { DateTime } from "luxon"
import { useState } from "react"
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
} as ComponentMeta<typeof DatePicker>

const Template: ComponentStory<typeof DatePicker> = (args) => <DatePicker {...args} />

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
  defaultValue: new Date(),
}
DefaultValue.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox", { name: "Label" })
  await expect(input).toHaveValue(DateTime.now().toFormat(DATE_FORMAT))
}

export const USFormat = Template.bind({})
USFormat.args = {
  ...WithLabel.args,
  inputFormat: "MM/DD/YYYY",
}

export const FreeInput = Template.bind({})
FreeInput.args = {
  ...WithLabel.args,
  allowFreeInput: true,
}

const ControlledTemplate: ComponentStory<typeof DatePicker> = (args) => {
  const [value, setValue] = useState<Date | null>(null)
  return <DatePicker {...args} value={value} onChange={setValue} />
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
}

export const Keyboard = ControlledTemplate.bind({})
Keyboard.args = {
  ...WithLabel.args,
}
Keyboard.play = async ({ canvasElement }) => {
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
}
