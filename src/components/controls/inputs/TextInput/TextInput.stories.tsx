import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
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

export const Default = Template.bind({})
Default.args = {
  label: "Label",
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox")
  await expect(input).toHaveAccessibleName("Label")
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
  const input = canvas.getByRole("textbox")
  await expect(input).toHaveAccessibleName("Label")
  await expect(input).not.toHaveAccessibleDescription()
  await expect(input).not.toHaveErrorMessage()
}

export const Message = Template.bind({})
Message.args = {
  ...Default.args,
  message: "Message.",
}
Message.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox")
  await expect(input).toHaveAccessibleName("Label")
  await expect(input).toHaveAccessibleDescription("Message.")
  await expect(input).not.toHaveErrorMessage()
}

export const SuccessMessage = Template.bind({})
SuccessMessage.args = {
  ...Default.args,
  message: "Success message.",
  status: "success",
}
SuccessMessage.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox")
  await expect(input).toHaveAccessibleName("Label")
  await expect(input).toHaveAccessibleDescription("Success message.")
  await expect(input).not.toHaveErrorMessage()
}

export const ErrorMessage = Template.bind({})
ErrorMessage.args = {
  ...Default.args,
  message: "Error message.",
  status: "fail",
}
ErrorMessage.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox")
  await expect(input).toHaveAccessibleName("Label")
  await expect(input).not.toHaveAccessibleDescription()
  await expect(input).toHaveErrorMessage("Error message.")
}
