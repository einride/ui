import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { ComponentProps, useState } from "react"
import { Textarea } from "./Textarea"

const meta = {
  title: "Controls/Textareas/Textarea",
  component: Textarea,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const WithLabel = {
  args: {
    label: "Label",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByRole("textbox")
    await expect(textarea).toHaveAccessibleName("Label")
  },
} satisfies Story

export const WithoutLabel = {
  args: {
    "aria-label": "Label",
    placeholder: "Placeholder",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByRole("textbox")
    await expect(textarea).toHaveAccessibleName("Label")
  },
} satisfies Story

export const DefaultValue = {
  args: {
    ...WithLabel.args,
    defaultValue: "Default value",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByRole("textbox", { name: "Label" })
    await expect(textarea).toHaveValue("Default value")
  },
} satisfies Story

export const Message = {
  args: {
    ...WithLabel.args,
    message: <>Message</>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByRole("textbox", { name: "Label" })
    await expect(textarea).toHaveAccessibleDescription("Message")
    await expect(textarea).toBeValid()
  },
} satisfies Story

export const Negative = {
  args: {
    ...WithLabel.args,
    status: "fail",
    message: <>Negative message</>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByRole("textbox", { name: "Label" })
    await expect(textarea).toHaveErrorMessage("Negative message")
    await expect(textarea).toBeInvalid()
  },
} satisfies Story

export const Positive = {
  args: {
    ...WithLabel.args,
    status: "success",
    message: <>Positive message</>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByRole("textbox", { name: "Label" })
    await expect(textarea).toHaveAccessibleDescription("Positive message")
    await expect(textarea).toBeValid()
  },
} satisfies Story

const ControlledTemplate = (args: ComponentProps<typeof Textarea>): JSX.Element => {
  const [value, setValue] = useState("")
  return <Textarea {...args} value={value} onChange={(e) => setValue(e.target.value)} />
}

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...WithLabel.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByRole("textbox", { name: "Label" })
    await expect(textarea).toHaveValue("")
  },
} satisfies Story

export const Mouse = {
  args: {
    ...WithLabel.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByRole("textbox", { name: "Label" })
    await expect(textarea).not.toHaveFocus()
    await userEvent.click(textarea)
    await expect(textarea).toHaveFocus()
    await expect(textarea).toHaveValue("")
    await userEvent.type(textarea, "Just filling in a textarea here! 💬", { delay: 10 })
    await expect(textarea).toHaveValue("Just filling in a textarea here! 💬")
  },
} satisfies Story

export const Keyboard = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...WithLabel.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const textarea = canvas.getByRole("textbox", { name: "Label" })
    await expect(textarea).not.toHaveFocus()
    await userEvent.tab()
    await expect(textarea).toHaveFocus()
    await expect(textarea).toHaveValue("")
    await userEvent.type(textarea, "Just filling in a textarea here! 💬", { delay: 10 })
    await expect(textarea).toHaveValue("Just filling in a textarea here! 💬")
  },
} satisfies Story
