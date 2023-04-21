import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { ComponentProps, useState } from "react"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { TextInput } from "./TextInput"

const meta = {
  component: TextInput,
  argTypes: {
    as: {
      control: false,
    },
    disabled: {
      control: "boolean",
    },
    suffix: {
      control: false,
    },
  },
} satisfies Meta<typeof TextInput>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
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
    ...Basic.args,
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

const ControlledTemplate = (args: ComponentProps<typeof TextInput>): JSX.Element => {
  const [value, setValue] = useState("")
  return <TextInput {...args} value={value} onChange={(e) => setValue(e.target.value)} />
}

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...Basic.args,
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
    ...Basic.args,
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
    ...Basic.args,
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

/** Add a suffix with the `suffix` prop. Can be used to show the unit when inputting a measurement as an example. */
export const Suffix = {
  args: {
    ...Basic.args,
    label: "Weight",
    suffix: <>kg</>,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: Suffix.args.label })
    const suffix = canvas.getByText(Suffix.args.suffix.props.children)

    await step("Except no input value initially", async () => {
      expect(input).toHaveValue("")
    })

    await step("Expect suffix to show", async () => {
      expect(suffix).toBeInTheDocument()
    })
  },
} satisfies Story

export const ErrorMessage = {
  args: {
    ...Basic.args,
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
    ...Basic.args,
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

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Basic, WithoutLabel, ReadOnly, DefaultValue, Message, SuccessMessage, ErrorMessage].map(
        (Story, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <TextInput key={index} {...Story.args} />
        ),
      )}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies StoryObj
