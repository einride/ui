import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { useState } from "react"
import { Textarea } from "./Textarea"

export default {
  title: "Controls/Textareas/Textarea",
  component: Textarea,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof Textarea>

const Template: ComponentStory<typeof Textarea> = (args) => <Textarea {...args} />

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: "Label",
}
WithLabel.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const textarea = canvas.getByRole("textbox")
  await expect(textarea).toHaveAccessibleName("Label")
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  "aria-label": "Label",
  placeholder: "Placeholder...",
}
WithLabel.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const textarea = canvas.getByRole("textbox")
  await expect(textarea).toHaveAccessibleName("Label")
}

export const DefaultValue = Template.bind({})
DefaultValue.args = {
  ...WithLabel.args,
  defaultValue: "Default value",
}
DefaultValue.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const textarea = canvas.getByRole("textbox", { name: "Label" })
  await expect(textarea).toHaveValue("Default value")
}

export const Message = Template.bind({})
Message.args = {
  ...WithLabel.args,
  message: <>Message</>,
}
Message.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const textarea = canvas.getByRole("textbox", { name: "Label" })
  await expect(textarea).toHaveAccessibleDescription("Message")
  await expect(textarea).toBeValid()
}

export const Negative = Template.bind({})
Negative.args = {
  ...WithLabel.args,
  status: "fail",
  message: <>Negative message</>,
}
Negative.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const textarea = canvas.getByRole("textbox", { name: "Label" })
  await expect(textarea).toHaveErrorMessage("Negative message")
  await expect(textarea).toBeInvalid()
}

export const Positive = Template.bind({})
Positive.args = {
  ...WithLabel.args,
  status: "success",
  message: <>Positive message</>,
}
Positive.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const textarea = canvas.getByRole("textbox", { name: "Label" })
  await expect(textarea).toHaveAccessibleDescription("Positive message")
  await expect(textarea).toBeValid()
}

const ControlledTemplate: ComponentStory<typeof Textarea> = (args) => {
  const [value, setValue] = useState("")
  return <Textarea {...args} value={value} onChange={(e) => setValue(e.target.value)} />
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  ...WithLabel.args,
}
Controlled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const textarea = canvas.getByRole("textbox", { name: "Label" })
  await expect(textarea).toHaveValue("")
}

export const Mouse = Template.bind({})
Mouse.args = {
  ...WithLabel.args,
}
Mouse.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const textarea = canvas.getByRole("textbox", { name: "Label" })
  await expect(textarea).not.toHaveFocus()
  await userEvent.click(textarea)
  await expect(textarea).toHaveFocus()
  await expect(textarea).toHaveValue("")
  await userEvent.type(textarea, "Just filling in a textarea here! 💬", { delay: 10 })
  await expect(textarea).toHaveValue("Just filling in a textarea here! 💬")
}

export const Keyboard = ControlledTemplate.bind({})
Keyboard.args = {
  ...WithLabel.args,
}
Keyboard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const textarea = canvas.getByRole("textbox", { name: "Label" })
  await expect(textarea).not.toHaveFocus()
  await userEvent.tab()
  await expect(textarea).toHaveFocus()
  await expect(textarea).toHaveValue("")
  await userEvent.type(textarea, "Just filling in a textarea here! 💬", { delay: 10 })
  await expect(textarea).toHaveValue("Just filling in a textarea here! 💬")
}
