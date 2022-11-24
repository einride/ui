import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { useState } from "react"
import { TextInput } from "./TextInput"

export default {
  title: "Controls/Inputs/TextInput",
  component: TextInput,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof TextInput>

const Template: ComponentStory<typeof TextInput> = (args) => <TextInput {...args} />

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: "Label",
}
WithLabel.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox", { name: "Label" })
  await expect(input).toHaveValue("")
  await expect(input).not.toHaveAccessibleDescription()
  await expect(input).not.toHaveErrorMessage()
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  "aria-label": "Label",
  placeholder: "Placeholder...",
}
WithoutLabel.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox", { name: "Label" })
  await expect(input).toHaveValue("")
  await expect(input).not.toHaveAccessibleDescription()
  await expect(input).not.toHaveErrorMessage()
}

export const DefaultValue = Template.bind({})
DefaultValue.args = {
  ...WithLabel.args,
  defaultValue: "Default value",
}
DefaultValue.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox", { name: "Label" })
  await expect(input).toHaveValue("Default value")
  await expect(input).not.toHaveAccessibleDescription()
  await expect(input).not.toHaveErrorMessage()
}

const ControlledTemplate: ComponentStory<typeof TextInput> = (args) => {
  const [value, setValue] = useState("")
  return <TextInput {...args} value={value} onChange={(e) => setValue(e.target.value)} />
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  ...WithLabel.args,
}
Controlled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox", { name: "Label" })
  await expect(input).toHaveValue("")
  await expect(input).not.toHaveAccessibleDescription()
  await expect(input).not.toHaveErrorMessage()
}

export const Message = Template.bind({})
Message.args = {
  ...WithLabel.args,
  message: "Message.",
}
Message.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox", { name: "Label" })
  await expect(input).toHaveAccessibleDescription("Message.")
  await expect(input).not.toHaveErrorMessage()
}

export const SuccessMessage = Template.bind({})
SuccessMessage.args = {
  ...WithLabel.args,
  message: "Success message.",
  status: "success",
}
SuccessMessage.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox", { name: "Label" })
  await expect(input).toHaveAccessibleDescription("Success message.")
  await expect(input).not.toHaveErrorMessage()
}

export const ErrorMessage = Template.bind({})
ErrorMessage.args = {
  ...WithLabel.args,
  message: "Error message.",
  status: "fail",
}
ErrorMessage.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox", { name: "Label" })
  await expect(input).not.toHaveAccessibleDescription()
  await expect(input).toHaveErrorMessage("Error message.")
}

export const Keyboard = Template.bind({})
Keyboard.args = {
  ...WithLabel.args,
}
Keyboard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox", { name: "Label" })
  await expect(input).not.toHaveFocus()
  await userEvent.tab()
  await expect(input).toHaveFocus()
  await expect(input).toHaveValue("")
  await userEvent.keyboard("Just filling in a text input!")
  await expect(input).toHaveValue("Just filling in a text input!")
}
