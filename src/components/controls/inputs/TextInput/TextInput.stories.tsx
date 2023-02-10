import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory, ComponentStoryObj } from "@storybook/react"
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
} satisfies ComponentMeta<typeof TextInput>

type Story = ComponentStoryObj<typeof TextInput>

export const WithLabel = {
  args: {
    label: "Label",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Label" })
    await expect(input).toHaveValue("")
    await expect(input).not.toHaveAccessibleDescription()
    await expect(input).not.toHaveErrorMessage()
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
    await expect(input).not.toHaveAccessibleDescription()
    await expect(input).not.toHaveErrorMessage()
  },
} satisfies Story

export const ReadOnly = {
  args: {
    label: "Label",
    value: "Readonly value",
    readOnly: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Label" })
    await expect(input).toHaveAttribute("readonly")
  },
} satisfies Story

export const DefaultValue = {
  args: {
    ...WithLabel.args,
    defaultValue: "Default value",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Label" })
    await expect(input).toHaveValue("Default value")
    await expect(input).not.toHaveAccessibleDescription()
    await expect(input).not.toHaveErrorMessage()
  },
} satisfies Story

const ControlledTemplate: ComponentStory<typeof TextInput> = (args) => {
  const [value, setValue] = useState("")
  return <TextInput {...args} value={value} onChange={(e) => setValue(e.target.value)} />
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
    await expect(input).not.toHaveAccessibleDescription()
    await expect(input).not.toHaveErrorMessage()
  },
} satisfies Story

export const Message = {
  args: {
    ...WithLabel.args,
    message: "Message.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Label" })
    await expect(input).toHaveAccessibleDescription("Message.")
    await expect(input).not.toHaveErrorMessage()
  },
} satisfies Story

export const SuccessMessage = {
  args: {
    ...WithLabel.args,
    message: "Success message.",
    status: "success",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Label" })
    await expect(input).toHaveAccessibleDescription("Success message.")
    await expect(input).not.toHaveErrorMessage()
  },
} satisfies Story

export const ErrorMessage = {
  args: {
    ...WithLabel.args,
    message: "Error message.",
    status: "fail",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Label" })
    await expect(input).not.toHaveAccessibleDescription()
    await expect(input).toHaveErrorMessage("Error message.")
  },
} satisfies Story

export const Keyboard = {
  args: {
    ...WithLabel.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Label" })
    await expect(input).not.toHaveFocus()
    await userEvent.tab()
    await expect(input).toHaveFocus()
    await expect(input).toHaveValue("")
    await userEvent.keyboard("Just filling in a text input!")
    await expect(input).toHaveValue("Just filling in a text input!")
  },
} satisfies Story
