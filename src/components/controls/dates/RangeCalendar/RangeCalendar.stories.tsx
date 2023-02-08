import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { ComponentProps, useState } from "react"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { RangeCalendar } from "./RangeCalendar"

export default {
  title: "Controls/Dates/RangeCalendar",
  component: RangeCalendar,
} as ComponentMeta<typeof RangeCalendar>

const Template: ComponentStory<typeof RangeCalendar> = (args) => {
  const { value: defaultValue } = args
  const [value, setValue] = useState(defaultValue)
  return <RangeCalendar {...args} value={value} onChange={setValue} />
}

export const Default = Template.bind({})
Default.args = {
  value: [null, null],
}
Default.play = async ({ args }) => {
  await expect(args.value).toEqual([null, null])
}

export const DefaultValue = Template.bind({})
DefaultValue.args = {
  value: [new Date(new Date().setDate(1)), new Date(new Date().setDate(4))],
}
DefaultValue.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement)
  await expect(args.value[0]).toBeTruthy()
  await expect(args.value[1]).toBeTruthy()

  const firstDayInCurrentMonthButton = canvas.getByRole("button", { name: "1" })
  await expect(firstDayInCurrentMonthButton.getAttribute("data-selected")).toBe("true")
  const fourthDayInCurrentMonthButton = canvas.getByRole("button", { name: "4" })
  await expect(fourthDayInCurrentMonthButton.getAttribute("data-selected")).toBe("true")
}

export const Mouse = Template.bind({})
Mouse.args = {
  value: [null, null],
}
Mouse.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const firstDayInCurrentMonthButton = canvas.getByRole("button", { name: "1" })
  await userEvent.click(firstDayInCurrentMonthButton)
  await expect(firstDayInCurrentMonthButton.getAttribute("data-selected")).toBe("true")
  const fourthDayInCurrentMonthButton = canvas.getByRole("button", { name: "4" })
  await userEvent.click(fourthDayInCurrentMonthButton)
  await expect(fourthDayInCurrentMonthButton.getAttribute("data-selected")).toBe("true")
  const previousMonthButton = canvas.getAllByRole("button")[0]
  await userEvent.click(previousMonthButton)
  const firstDayInLastMonthButton = canvas.getByRole("button", { name: "1" })
  await userEvent.click(firstDayInLastMonthButton)
  await expect(firstDayInLastMonthButton.getAttribute("data-selected")).toBe("true")
  const fourthDayInLastMonthButton = canvas.getByRole("button", { name: "4" })
  await userEvent.click(fourthDayInLastMonthButton)
  await expect(fourthDayInLastMonthButton.getAttribute("data-selected")).toBe("true")
}

export const Keyboard = Template.bind({})
Keyboard.args = {
  value: [null, null],
}
Keyboard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.tab()
  await userEvent.tab()
  await userEvent.tab()
  const firstDayInCurrentMonthButton = canvas.getByRole("button", { name: "1" })
  await expect(firstDayInCurrentMonthButton).toHaveFocus()
  await userEvent.keyboard("[Enter]")
  await expect(firstDayInCurrentMonthButton.getAttribute("data-selected")).toBe("true")
  await userEvent.keyboard("[ArrowDown]")
  const eighthDayInCurrentMonthButton = canvas.getByRole("button", { name: "8" })
  await expect(eighthDayInCurrentMonthButton).toHaveFocus()
  await userEvent.keyboard("[Enter]")
  await expect(firstDayInCurrentMonthButton.getAttribute("data-selected")).toBe("true")
  await expect(eighthDayInCurrentMonthButton.getAttribute("data-selected")).toBe("true")
  await userEvent.tab({ shift: true })
  await userEvent.tab({ shift: true })
  await userEvent.tab({ shift: true })
  const previousMonthButton = canvas.getAllByRole("button")[0]
  await expect(previousMonthButton).toHaveFocus()
  await userEvent.keyboard("[Enter]")
  const firstDayInLastMonthButton = canvas.getByRole("button", { name: "1" })
  await userEvent.click(firstDayInLastMonthButton) // until keyboard navigation is fixed in Mantine component
  await expect(firstDayInLastMonthButton.getAttribute("data-selected")).toBe("true")
  const eighthDayInLastMonthButton = canvas.getByRole("button", { name: "8" })
  await userEvent.keyboard("[ArrowDown]")
  await userEvent.keyboard("[Enter]")
  await expect(firstDayInLastMonthButton.getAttribute("data-selected")).toBe("true")
  await expect(eighthDayInLastMonthButton.getAttribute("data-selected")).toBe("true")
}

export const Snapshot = (): JSX.Element => (
  <SnapshotWrapper>
    {[Default, DefaultValue].map((Story, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Story key={index} {...(Story.args as ComponentProps<typeof RangeCalendar>)} />
    ))}
  </SnapshotWrapper>
)
Snapshot.parameters = {
  chromatic: { disableSnapshot: false },
}
