import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { ComponentProps, useState } from "react"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { SearchInput } from "./SearchInput"

const meta = {
  title: "Controls/Inputs/SearchInput",
  component: SearchInput,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const WithLabel = {
  args: {
    label: "Search for something fun",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Search for something fun" })
    await expect(input).toHaveValue("")
  },
} satisfies Story

export const WithoutLabel = {
  args: {
    "aria-label": "Search for something fun",
    placeholder: "Search",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Search for something fun" })
    await expect(input).toHaveValue("")
  },
} satisfies Story

export const DefaultValue = {
  args: {
    ...WithLabel.args,
    defaultValue: "I'm searching for something fun! 🤓",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Search for something fun" })
    await expect(input).toHaveValue("I'm searching for something fun! 🤓")
  },
} satisfies Story

const ControlledTemplate = (args: ComponentProps<typeof SearchInput>): JSX.Element => {
  const [value, setValue] = useState("")
  return <SearchInput {...args} value={value} onInputChange={setValue} />
}

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...WithLabel.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Search for something fun" })
    await expect(input).toHaveValue("")
  },
} satisfies Story

export const Message = {
  args: {
    ...WithLabel.args,
    message: "Message.",
    messageProps: { "data-testid": "asd" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Search for something fun" })
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
    const input = canvas.getByRole("textbox", { name: "Search for something fun" })
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
    const input = canvas.getByRole("textbox", { name: "Search for something fun" })
    await expect(input).not.toHaveAccessibleDescription()
    await expect(input).toHaveErrorMessage("Error message.")
  },
} satisfies Story

export const ClearButton = {
  args: {
    ...WithLabel.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Search for something fun" })
    await userEvent.type(input, "I'm searching for something fun! 🤓", { delay: 10 })
    await expect(input).toHaveValue("I'm searching for something fun! 🤓")
    const clearButton = canvas.getByRole("button", { name: "Clear input" })
    await userEvent.click(clearButton)
    await expect(input).toHaveValue("")
    await expect(clearButton).not.toBeInTheDocument()
  },
} satisfies Story

export const Keyboard = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...WithLabel.args,
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Search for something fun" })
    await expect(input).not.toHaveFocus()
    await userEvent.tab()
    await expect(input).toHaveFocus()
    await userEvent.type(input, "I'm searching for something fun! 🤓", { delay: 10 })
    await expect(input).toHaveValue("I'm searching for something fun! 🤓")
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[WithLabel, WithoutLabel, DefaultValue, Message, SuccessMessage, ErrorMessage].map(
        (Story, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SearchInput key={index} {...Story.args} />
        ),
      )}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
}
