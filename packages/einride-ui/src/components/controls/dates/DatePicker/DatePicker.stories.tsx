import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { DateTime } from "luxon"
import { ComponentProps, useState } from "react"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { DatePicker } from "./DatePicker"

const meta = {
  component: DatePicker,
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

const defaultDate = DateTime.local(2022, 8, 1)
const today = DateTime.now()
const defaultDateFormat = "yyyy-MM-dd"
const mantineDateFormat = "d MMMM yyyy"

export const Basic = {
  args: {
    label: "Label",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("button", { name: "" })
    await expect(input).toBeInTheDocument()
    const label = canvas.getByText(Basic.args.label)
    await expect(label).toBeInTheDocument()
  },
} satisfies Story

export const WithoutLabel = {
  args: {
    "aria-label": "Label",
    placeholder: "Placeholder",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("button", { name: WithoutLabel.args["aria-label"] })
    await expect(input).toBeInTheDocument()
  },
} satisfies Story

export const DefaultValue = {
  args: {
    ...Basic.args,
    defaultValue: defaultDate.toJSDate(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("button", { name: defaultDate.toFormat(defaultDateFormat) })
    expect(input).toBeInTheDocument()
  },
} satisfies Story

export const USFormat = {
  args: {
    ...Basic.args,
    inputFormat: "MM/DD/YYYY",
    defaultValue: defaultDate.toJSDate(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("button", {
      name: defaultDate.toFormat("MM/dd/yyyy"),
    })
    expect(input).toBeInTheDocument()
  },
} satisfies Story

const ControlledTemplate = (args: ComponentProps<typeof DatePicker>): JSX.Element => {
  const [value, setValue] = useState<Date | null>(null)
  return <DatePicker {...args} value={value} onChange={setValue} />
}

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...Basic.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("button", { name: "" })
    await expect(input).toBeInTheDocument()
  },
} satisfies Story

export const Message = {
  args: {
    ...Basic.args,
    message: "Message",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const message = canvas.getByText(Message.args.message)
    await expect(message).toBeInTheDocument()
  },
} satisfies Story

export const SuccessMessage = {
  args: {
    ...Basic.args,
    message: "Success message",
    status: "success",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const message = canvas.getByText(SuccessMessage.args.message)
    await expect(message).toBeInTheDocument()
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
    const message = canvas.getByText(ErrorMessage.args.message)
    await expect(message).toBeInTheDocument()
  },
} satisfies Story

export const Pointer = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...Basic.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("button", { name: "" })
    await userEvent.click(input)
    const firstDateInCurrentMonth = today.set({ day: 1 })
    const firstDayInCurrentMonthButton = canvas.getByRole("button", {
      name: firstDateInCurrentMonth.toFormat(mantineDateFormat),
    })
    await userEvent.click(firstDayInCurrentMonthButton)
    await expect(input).toHaveAccessibleName(firstDateInCurrentMonth.toFormat(defaultDateFormat))
    await userEvent.click(input)
    const previousMonthButton = canvas.getByRole("button", { name: "Previous month" })
    await userEvent.click(previousMonthButton)
    const firstDateInPreviousMonth = today.minus({ month: 1 }).set({ day: 1 })
    const firstDateInPreviousMonthButton = canvas.getByRole("button", {
      name: firstDateInPreviousMonth.toFormat(mantineDateFormat),
    })
    await userEvent.click(firstDateInPreviousMonthButton)
    await expect(input).toHaveAccessibleName(firstDateInPreviousMonth.toFormat(defaultDateFormat))
  },
} satisfies Story

export const Keyboard = {
  args: {
    ...Basic.args,
    defaultValue: defaultDate.toJSDate(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("button", { name: defaultDate.toFormat(defaultDateFormat) })
    await expect(input).not.toHaveFocus()
    await userEvent.tab()
    await expect(input).toHaveFocus()
    await userEvent.keyboard("[Enter]")
    await userEvent.tab()
    await expect(canvas.getByRole("button", { name: "Previous month" })).toHaveFocus()
    await userEvent.tab()
    await expect(canvas.getByRole("button", { name: "Next month" })).toHaveFocus()
    await userEvent.tab()
    const defaultDateButton = canvas.getByRole("button", {
      name: defaultDate.toFormat(mantineDateFormat),
    })
    await expect(defaultDateButton).toHaveFocus()
    await userEvent.keyboard("[ArrowDown]")
    const eighthDate = defaultDate.set({ day: 8 })
    const eighthDateButton = canvas.getByRole("button", {
      name: eighthDate.toFormat(mantineDateFormat),
    })
    await expect(eighthDateButton).toHaveFocus()
    await userEvent.keyboard("[Enter]")
    await expect(input).toHaveAccessibleName(eighthDate.toFormat(defaultDateFormat))
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper alignItems="stretch">
      {[Basic, WithoutLabel, DefaultValue, USFormat, Message, SuccessMessage, ErrorMessage].map(
        (Story, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <DatePicker key={index} {...Story.args} />
        ),
      )}
    </SnapshotWrapper>
  ),
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies StoryObj
