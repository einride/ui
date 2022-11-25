import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { useState } from "react"
import { SearchInput } from "./SearchInput"

export default {
  title: "Controls/Inputs/SearchInput",
  component: SearchInput,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof SearchInput>

const Template: ComponentStory<typeof SearchInput> = (args) => <SearchInput {...args} />

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: "Search for something fun",
}
WithLabel.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox", { name: "Search for something fun" })
  await expect(input).toHaveValue("")
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  "aria-label": "Search for something fun",
  placeholder: "Search...",
}
WithoutLabel.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox", { name: "Search for something fun" })
  await expect(input).toHaveValue("")
}

export const DefaultValue = Template.bind({})
DefaultValue.args = {
  ...WithLabel.args,
  defaultValue: "I'm searching for something fun! 🤓",
}
DefaultValue.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox", { name: "Search for something fun" })
  await expect(input).toHaveValue("I'm searching for something fun! 🤓")
}

const ControlledTemplate: ComponentStory<typeof SearchInput> = (args) => {
  const [value, setValue] = useState("")
  return <SearchInput {...args} value={value} onInputChange={setValue} />
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  ...WithLabel.args,
}
Controlled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox", { name: "Search for something fun" })
  await expect(input).toHaveValue("")
}

export const Message = Template.bind({})
Message.args = {
  ...WithLabel.args,
  message: "Message.",
  messageProps: { "data-testid": "asd" },
}
Message.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox", { name: "Search for something fun" })
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
  const input = canvas.getByRole("textbox", { name: "Search for something fun" })
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
  const input = canvas.getByRole("textbox", { name: "Search for something fun" })
  await expect(input).not.toHaveAccessibleDescription()
  await expect(input).toHaveErrorMessage("Error message.")
}

export const ClearButton = Template.bind({})
ClearButton.args = {
  ...WithLabel.args,
}
ClearButton.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox", { name: "Search for something fun" })
  await userEvent.type(input, "I'm searching for something fun! 🤓", { delay: 10 })
  await expect(input).toHaveValue("I'm searching for something fun! 🤓")
  const clearButton = canvas.getByRole("button", { name: "Clear input" })
  await userEvent.click(clearButton)
  await expect(input).toHaveValue("")
  await expect(clearButton).not.toBeInTheDocument()
}

export const Keyboard = ControlledTemplate.bind({})
Keyboard.args = {
  ...WithLabel.args,
}

Keyboard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("textbox", { name: "Search for something fun" })
  await expect(input).not.toHaveFocus()
  await userEvent.tab()
  await expect(input).toHaveFocus()
  await userEvent.type(input, "I'm searching for something fun! 🤓", { delay: 10 })
  await expect(input).toHaveValue("I'm searching for something fun! 🤓")
}
