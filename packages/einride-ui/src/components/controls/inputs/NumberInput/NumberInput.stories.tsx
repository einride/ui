import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { ComponentProps, useState } from "react"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { NumberInput } from "./NumberInput"

const meta = {
  component: NumberInput,
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
} satisfies Meta<typeof NumberInput>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    label: "Label",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: Basic.args.label })
    await expect(input).toHaveValue("")
    await expect(input).not.toHaveAccessibleDescription()
    await expect(input).not.toHaveErrorMessage()
  },
} satisfies Story

/** If you for some reason can't show a visible label, a descriptive `aria-label` is required. Prefer using `label` when possible! */
export const WithoutLabel = {
  args: {
    "aria-label": "Label",
    placeholder: "Placeholder",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: WithoutLabel.args["aria-label"] })
    await expect(input).toHaveValue("")
    await expect(input).not.toHaveAccessibleDescription()
    await expect(input).not.toHaveErrorMessage()
  },
} satisfies Story

export const ReadOnly = {
  args: {
    ...Basic.args,
    value: "Readonly value",
    readOnly: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: ReadOnly.args.label })
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
    const input = canvas.getByRole("textbox", { name: DefaultValue.args.label })
    await expect(input).toHaveValue(DefaultValue.args.defaultValue)
    await expect(input).not.toHaveAccessibleDescription()
    await expect(input).not.toHaveErrorMessage()
  },
} satisfies Story

const ControlledTemplate = (args: ComponentProps<typeof NumberInput>): JSX.Element => {
  const [value, setValue] = useState("")
  return <NumberInput {...args} value={value} onChange={(e) => setValue(e.target.value)} />
}

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...Basic.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: Controlled.args.label })
    await expect(input).toHaveValue("")
    await expect(input).not.toHaveAccessibleDescription()
    await expect(input).not.toHaveErrorMessage()
  },
} satisfies Story

/** A message can be provided with the `message` prop. Can be used for giving some context for the input field. */
export const Message = {
  args: {
    ...Basic.args,
    message: "Message",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: Message.args.label })
    await expect(input).toHaveAccessibleDescription(Message.args.message)
    await expect(input).not.toHaveErrorMessage()
  },
} satisfies Story

/** `message` and `status` can be used together to show either a success message or an error message. */
export const SuccessMessage = {
  args: {
    ...Basic.args,
    message: "Success message",
    status: "success",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: SuccessMessage.args.label })
    await expect(input).toHaveAccessibleDescription(SuccessMessage.args.message)
    await expect(input).not.toHaveErrorMessage()
  },
} satisfies Story

export const ErrorMessage = {
  args: {
    ...Basic.args,
    message: "Error message",
    status: "fail",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: ErrorMessage.args.label })
    await expect(input).not.toHaveAccessibleDescription()
    await expect(input).toHaveErrorMessage(ErrorMessage.args.message)
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

export const Keyboard = {
  args: {
    ...Basic.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: Keyboard.args.label })
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
          <NumberInput key={index} {...Story.args} />
        ),
      )}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies StoryObj
