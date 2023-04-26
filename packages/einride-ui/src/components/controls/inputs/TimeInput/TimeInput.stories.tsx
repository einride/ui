import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { ComponentProps, useState } from "react"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { Box } from "../../../layout/Box/Box"
import { Group } from "../../../layout/Group/Group"
import { TimeInput } from "./TimeInput"
import { useRangeTimeInput } from "./useRangeTimeInput"

const meta = {
  component: TimeInput,
  argTypes: {
    message: {
      control: "text",
    },
  },
} satisfies Meta<typeof TimeInput>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    label: "Label",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText(Basic.args.label) // <input type="time" /> has not corresponding aria role: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#technical_summary

    await step("Expect default state", async () => {
      await expect(input).toHaveValue("")
      await expect(input).not.toHaveAccessibleDescription()
      await expect(input).not.toHaveErrorMessage()
    })
  },
} satisfies Story

/** If you for some reason can't show a visible label, a descriptive `aria-label` is required. Prefer using `label` when possible! */
export const WithoutLabel = {
  args: {
    "aria-label": "Label",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText(WithoutLabel.args["aria-label"])

    await step("Expect default state", async () => {
      await expect(input).toHaveValue("")
      await expect(input).not.toHaveAccessibleDescription()
      await expect(input).not.toHaveErrorMessage()
    })
  },
} satisfies Story

export const ReadOnly = {
  args: {
    ...Basic.args,
    value: "12:30",
    readOnly: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText(ReadOnly.args.label)

    await step("Expect default state", async () => {
      await expect(input).toHaveValue(ReadOnly.args.value)
      await expect(input).not.toHaveAccessibleDescription()
      await expect(input).not.toHaveErrorMessage()
      await expect(input).toHaveAttribute("readonly")
    })
  },
} satisfies Story

export const DefaultValue = {
  args: {
    ...Basic.args,
    defaultValue: "09:45",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText("Label")

    await step("Expect default state", async () => {
      await expect(input).toHaveValue(DefaultValue.args.defaultValue)
      await expect(input).not.toHaveAccessibleDescription()
      await expect(input).not.toHaveErrorMessage()
    })
  },
} satisfies Story

const ControlledTemplate = (args: ComponentProps<typeof TimeInput>): JSX.Element => {
  const [value, setValue] = useState("")
  return <TimeInput {...args} value={value} onChange={(e) => setValue(e.target.value)} />
}

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...Basic.args,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText(Controlled.args.label)

    await step("Expect default state", async () => {
      await expect(input).toHaveValue("")
      await expect(input).not.toHaveAccessibleDescription()
      await expect(input).not.toHaveErrorMessage()
    })
  },
} satisfies Story

const RangeTemplate = (): JSX.Element => {
  const { valueFrom, onChangeFrom, valueTo, onChangeTo, minTo, maxFrom, status } =
    useRangeTimeInput()
  return (
    <Group gap="xs">
      <TimeInput label="From" max={maxFrom} onChange={onChangeFrom} value={valueFrom} />
      <Box as="span" alignSelf="flex-end" blockSize="lg" display="flex" alignItems="center">
        &ndash;
      </Box>
      <TimeInput status={status} label="To" min={minTo} onChange={onChangeTo} value={valueTo} />
    </Group>
  )
}

/** If you need a start and end time, you can use two `<TimeInput>` and associate them with `useRangeTimeInput()`. */
export const Range = {
  render: () => <RangeTemplate />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const inputFrom = canvas.getByLabelText("From")
    const inputTo = canvas.getByLabelText("To")

    await step("Expect default state", async () => {
      await expect(inputFrom).toHaveValue("")
      await expect(inputFrom).not.toHaveAccessibleDescription()
      await expect(inputFrom).not.toHaveErrorMessage()
      await expect(inputTo).toHaveValue("")
      await expect(inputTo).not.toHaveAccessibleDescription()
      await expect(inputTo).not.toHaveErrorMessage()
    })
  },
} satisfies StoryObj

/** A message can be provided with the `message` prop. Can be used for giving some context for the input field. */
export const Message = {
  args: {
    ...Basic.args,
    message: "Message",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText(Message.args.label)

    await step("Expect default state", async () => {
      await expect(input).toHaveValue("")
      await expect(input).toHaveAccessibleDescription(Message.args.message)
      await expect(input).not.toHaveErrorMessage()
    })
  },
} satisfies Story

export const SuccessMessage = {
  args: {
    ...Basic.args,
    message: "Success message",
    status: "success",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText(SuccessMessage.args.label)

    await step("Expect default state", async () => {
      await expect(input).toHaveValue("")
      await expect(input).toHaveAccessibleDescription(SuccessMessage.args.message)
      await expect(input).not.toHaveErrorMessage()
    })
  },
} satisfies Story

export const ErrorMessage = {
  args: {
    ...Basic.args,
    message: "Error message",
    status: "fail",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText(ErrorMessage.args.label)

    await step("Expect default state", async () => {
      await expect(input).toHaveValue("")
      await expect(input).not.toHaveAccessibleDescription()
      await expect(input).toHaveErrorMessage(ErrorMessage.args.message)
    })
  },
} satisfies Story

export const Keyboard = {
  args: {
    ...Basic.args,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText(Keyboard.args.label)

    await step("Expect default state", async () => {
      await expect(input).toHaveValue("")
      await expect(input).not.toHaveAccessibleDescription()
      await expect(input).not.toHaveErrorMessage()
    })

    await step("Expect focus when tabbing", async () => {
      await expect(input).not.toHaveFocus()
      await userEvent.tab()
      await expect(input).toHaveFocus()
    })

    await step("Expect value to change when typing", async () => {
      await expect(input).toHaveValue("")
      await userEvent.keyboard("2015")
      await expect(input).toHaveValue("20:15")
    })
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
      {[Basic, WithoutLabel, ReadOnly, DefaultValue, Message, SuccessMessage, ErrorMessage].map(
        (Story, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <TimeInput key={index} {...Story.args} />
        ),
      )}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies StoryObj
