import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { DateTime } from "luxon"
import { ComponentProps, useState } from "react"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { DateRangePicker, DateRangePickerValue } from "./DateRangePicker"

const meta = {
  component: DateRangePicker,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof DateRangePicker>

export default meta
type Story = StoryObj<typeof meta>

const defaultDate = DateTime.local(2022, 8, 1)
const defaultEndDate = defaultDate.set({ day: 8 })
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
    expect(input).toBeInTheDocument()
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
    defaultValue: [defaultDate.toJSDate(), defaultEndDate.toJSDate()],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("button", {
      name: `${defaultDate.toFormat(defaultDateFormat)} – ${defaultEndDate.toFormat(
        defaultDateFormat,
      )}`,
    })
    await expect(input).toBeInTheDocument()
  },
} satisfies Story

export const USFormat = {
  args: {
    ...Basic.args,
    inputFormat: "MM/DD/YYYY",
    defaultValue: [defaultDate.toJSDate(), defaultEndDate.toJSDate()],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("button", {
      name: `${defaultDate.toFormat("MM/dd/yyyy")} – ${defaultEndDate.toFormat("MM/dd/yyyy")}`,
    })
    expect(input).toBeInTheDocument()
  },
} satisfies Story

const ControlledTemplate = (args: ComponentProps<typeof DateRangePicker>): JSX.Element => {
  const [value, setValue] = useState<DateRangePickerValue>([null, null])
  return <DateRangePicker {...args} value={value} onChange={setValue} />
}

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...Basic.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("button", { name: "" })
    expect(input).toBeInTheDocument()
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
    const input = canvas.getByRole("button")
    const firstDateInCurrentMonth = today.set({ day: 1 })
    const fourthDateInCurrentMonth = today.set({ day: 4 })
    await userEvent.click(input)
    const firstDateInCurrentMonthButton = canvas.getByRole("button", {
      name: firstDateInCurrentMonth.toFormat(mantineDateFormat),
    })
    await userEvent.click(firstDateInCurrentMonthButton)
    const fourthDayInCurrentMonthButton = canvas.getByRole("button", {
      name: fourthDateInCurrentMonth.toFormat(mantineDateFormat),
    })
    await userEvent.click(fourthDayInCurrentMonthButton)
    await expect(input).toHaveAccessibleName(
      `${firstDateInCurrentMonth.toFormat(defaultDateFormat)} – ${fourthDateInCurrentMonth.toFormat(
        defaultDateFormat,
      )}`,
    )
    await userEvent.click(input)
    const previousMonthButton = canvas.getByRole("button", { name: "Previous month" })
    await userEvent.click(previousMonthButton)
    const firstDateInPreviousMonth = firstDateInCurrentMonth.minus({ month: 1 })
    const firstDateInLastMonthButton = canvas.getByRole("button", {
      name: firstDateInPreviousMonth.toFormat(mantineDateFormat),
    })
    await userEvent.click(firstDateInLastMonthButton)
    const fourthDateInPreviousMonth = fourthDateInCurrentMonth.minus({ month: 1 })
    const fourthDateInLastMonthButton = canvas.getByRole("button", {
      name: fourthDateInPreviousMonth.toFormat(mantineDateFormat),
    })
    await userEvent.click(fourthDateInLastMonthButton)
    const firstDateInLastMonth = today.set({ day: 1 }).minus({ month: 1 })
    const fourthDateInLastMonth = today.set({ day: 4 }).minus({ month: 1 })
    await expect(input).toHaveAccessibleName(
      `${firstDateInLastMonth.toFormat(defaultDateFormat)} – ${fourthDateInLastMonth.toFormat(
        defaultDateFormat,
      )}`,
    )
  },
} satisfies Story

export const Keyboard = {
  args: {
    ...Basic.args,
    defaultValue: [defaultDate.toJSDate(), defaultEndDate.toJSDate()],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("button", {
      name: `${defaultDate.toFormat(defaultDateFormat)} – ${defaultEndDate.toFormat(
        defaultDateFormat,
      )}`,
    })
    await expect(input).not.toHaveFocus()
    await userEvent.tab()
    await expect(input).toHaveFocus()
    await userEvent.keyboard("[Enter]")
    await userEvent.tab()
    await expect(canvas.getByRole("button", { name: "Previous month" })).toHaveFocus()
    await userEvent.tab()
    await expect(canvas.getByRole("button", { name: "Next month" })).toHaveFocus()
    await userEvent.tab()
    const startDateButton = canvas.getByRole("button", {
      name: defaultDate.toFormat(mantineDateFormat),
    })
    await expect(startDateButton).toHaveFocus()
    await userEvent.keyboard("[Enter]")
    await userEvent.keyboard("[ArrowDown]")
    const endDateButton = canvas.getByRole("button", {
      name: defaultDate.set({ day: 8 }).toFormat(mantineDateFormat),
    })
    await expect(endDateButton).toHaveFocus()
    await userEvent.keyboard("[Enter]")
    await expect(input).toHaveAccessibleName(
      `${defaultDate.toFormat(defaultDateFormat)} – ${defaultEndDate.toFormat(defaultDateFormat)}`,
    )
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper alignItems="stretch">
      {[
        Basic,
        WithoutLabel,
        DefaultValue,
        USFormat,
        Controlled,
        Message,
        SuccessMessage,
        ErrorMessage,
      ].map((Story, index) => (
        <DateRangePicker
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          {...Story.args}
        />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies StoryObj
