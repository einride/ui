import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { ComponentProps, useState } from "react"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { HorizontalLayout } from "../../../../main"
import { TimeInput } from "./TimeInput"
import { useRangeTimeInput } from "./useRangeTimeInput"

const meta = {
  title: "Controls/Inputs/TimeInput",
  component: TimeInput,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof TimeInput>

export default meta
type Story = StoryObj<typeof meta>

export const WithLabel = {
  args: {
    label: "Label",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText("Label")

    await expect(input).toHaveAttribute("type", "time")
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
    const input = canvas.getByLabelText("Label")
    await expect(input).toHaveValue("")
    await expect(input).not.toHaveAccessibleDescription()
    await expect(input).not.toHaveErrorMessage()
  },
} satisfies Story

export const ReadOnly = {
  args: {
    label: "Label",
    value: "12:30",
    readOnly: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText("Label")
    await expect(input).toHaveAttribute("readonly")
  },
} satisfies Story

export const DefaultValue = {
  args: {
    ...WithLabel.args,
    defaultValue: "09:45",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText("Label")
    await expect(input).toHaveValue("09:45")
    await expect(input).not.toHaveAccessibleDescription()
    await expect(input).not.toHaveErrorMessage()
  },
} satisfies Story

const ControlledTemplate = (args: ComponentProps<typeof TimeInput>): JSX.Element => {
  const [value, setValue] = useState("")
  return <TimeInput {...args} value={value} onChange={(e) => setValue(e.target.value)} />
}

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...WithLabel.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText("Label")
    await expect(input).toHaveValue("")
    await expect(input).not.toHaveAccessibleDescription()
    await expect(input).not.toHaveErrorMessage()
  },
} satisfies Story

const RangeTemplate = (): JSX.Element => {
  const { valueFrom, onChangeFrom, valueTo, onChangeTo, minTo, maxFrom, status } =
    useRangeTimeInput()
  return (
    <HorizontalLayout>
      <TimeInput label="from" name="from" max={maxFrom} onChange={onChangeFrom} value={valueFrom} />
      <span
        style={{
          alignSelf: "flex-end",
          lineHeight: "3rem",
        }}
      >
        &ndash;
      </span>
      <TimeInput
        status={status}
        label="to"
        name="to"
        min={minTo}
        onChange={onChangeTo}
        value={valueTo}
      />
    </HorizontalLayout>
  )
}

export const Range = {
  render: () => <RangeTemplate />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const inputFrom = canvas.getByLabelText("from")
    await expect(inputFrom).toHaveValue("")
    await expect(inputFrom).not.toHaveAccessibleDescription()
    await expect(inputFrom).not.toHaveErrorMessage()
    const inputTo = canvas.getByLabelText("to")
    await expect(inputTo).toHaveValue("")
    await expect(inputTo).not.toHaveAccessibleDescription()
    await expect(inputTo).not.toHaveErrorMessage()
  },
} satisfies StoryObj

export const Message = {
  args: {
    ...WithLabel.args,
    message: "Message.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText("Label")
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
    const input = canvas.getByLabelText("Label")
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
    const input = canvas.getByLabelText("Label")
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
    const input = canvas.getByLabelText("Label")
    await expect(input).not.toHaveFocus()
    await userEvent.tab()
    await expect(input).toHaveFocus()
    await expect(input).toHaveValue("")
    await userEvent.keyboard("2015")
    await expect(input).toHaveValue("20:15")
  },
} satisfies Story

export const Snapshot = {
  argTypes: {
    disabled: {
      control: false,
    },
  },
  render: () => (
    <SnapshotWrapper>
      {[WithLabel, WithoutLabel, ReadOnly, DefaultValue, Message, SuccessMessage, ErrorMessage].map(
        (Story, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <TimeInput key={index} {...Story.args} />
        ),
      )}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies StoryObj
