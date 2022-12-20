import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { useState } from "react"
import { DateRangePicker, DateRangePickerValue } from "./DateRangePicker"

export default {
  title: "Controls/Dates/DateRangePicker",
  component: DateRangePicker,
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
  await expect(input).toHaveValue(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}-01 – ${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-10`,
  )
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
  const fourthDayInCurrentMonthButton = canvas.getByRole("button", { name: "4" })
  await userEvent.click(fourthDayInCurrentMonthButton)
  await expect(input).toHaveValue(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}-01 – ${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-04`,
  )
  await userEvent.click(input)
  const previousMonthButton = canvas.getAllByRole("button")[0]
  await userEvent.click(previousMonthButton)
  const firstDayInLastMonthButton = canvas.getByRole("button", { name: "1" })
  await userEvent.click(firstDayInLastMonthButton)
  const fourthDayInLastMonthButton = canvas.getByRole("button", { name: "4" })
  await userEvent.click(fourthDayInLastMonthButton)
  await expect(input).toHaveValue(
    `${new Date().getFullYear()}-${new Date().getMonth()}-01 – ${new Date().getFullYear()}-${new Date().getMonth()}-04`,
  )
}

export const Keyboard = ControlledTemplate.bind({})
Keyboard.args = {
  ...WithLabel.args,
}
Keyboard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox")
  await expect(input).toHaveValue("")
  await expect(input).not.toHaveFocus()
  await userEvent.tab()
  await expect(input).toHaveFocus()
  await userEvent.keyboard("[Enter]")
  await userEvent.keyboard("[Enter]")
  await userEvent.keyboard("[ArrowRight]")
  await userEvent.keyboard("[ArrowRight]")
  await userEvent.keyboard("[ArrowRight]")
  await userEvent.keyboard("[Enter]")
  await expect(input).toHaveValue(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}-01 – ${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-04`,
  )
  await userEvent.keyboard("[Enter]")
  await userEvent.tab()
  await userEvent.keyboard("[Enter]")
  const firstDayInLastMonthButton = canvas.getByRole("button", { name: "1" })
  await userEvent.click(firstDayInLastMonthButton) // until keyboard navigation is fixed in Mantine component
  const fourthDayInLastMonthButton = canvas.getByRole("button", { name: "4" })
  await userEvent.click(fourthDayInLastMonthButton) // until keyboard navigation is fixed in Mantine component
  await expect(input).toHaveValue(
    `${new Date().getFullYear()}-${new Date().getMonth()}-01 – ${new Date().getFullYear()}-${new Date().getMonth()}-04`,
  )
}
