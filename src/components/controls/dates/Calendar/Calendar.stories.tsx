import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { ComponentProps, useState } from "react"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { Calendar } from "./Calendar"

export default {
  title: "Controls/Dates/Calendar",
  component: Calendar,
} as ComponentMeta<typeof Calendar>

const Template: ComponentStory<typeof Calendar> = (args) => {
  const { value: defaultValue } = args
  const [value, setValue] = useState(defaultValue)
  return <Calendar {...args} value={value} onChange={setValue} />
}

export const Default = Template.bind({})
Default.args = {}
Default.play = async ({ args }) => {
  await expect(args.value).toBeFalsy()
}

export const DefaultValue = Template.bind({})
DefaultValue.args = {
  value: new Date(new Date().setDate(10)),
}
DefaultValue.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement)
  await expect(args.value).toBeTruthy()

  const currentDayButton = canvas.getByRole("button", { name: "10" })
  await expect(currentDayButton.getAttribute("data-selected")).toBe("true")
}

export const Mouse = Template.bind({})
Mouse.args = {
  value: new Date(new Date().setDate(10)),
}
Mouse.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement)
  await expect(args.value).toBeTruthy()
  const currentDayButton = canvas.getByRole("button", { name: "10" })
  await expect(currentDayButton.getAttribute("data-selected")).toBe("true")
  const previousMonthButton = canvas.getAllByRole("button")[0]
  await userEvent.click(previousMonthButton)
  const fourthDayInLastMonthButton = canvas.getByRole("button", { name: "4" })
  await userEvent.click(fourthDayInLastMonthButton)
  await expect(fourthDayInLastMonthButton.getAttribute("data-selected")).toBe("true")
}

export const Keyboard = Template.bind({})
Keyboard.args = {}
Keyboard.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement)
  await expect(args.value).toBeFalsy()
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
  await expect(eighthDayInCurrentMonthButton.getAttribute("data-selected")).toBe("true")
  await expect(firstDayInCurrentMonthButton.getAttribute("data-selected")).not.toBe("true")
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
  await expect(firstDayInLastMonthButton.getAttribute("data-selected")).not.toBe("true")
  await expect(eighthDayInLastMonthButton.getAttribute("data-selected")).toBe("true")
}

export const Snapshot = (): JSX.Element => (
  <SnapshotWrapper>
    {[Default, DefaultValue].map((Story, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Story key={index} {...(Story.args as ComponentProps<typeof Calendar>)} />
    ))}
  </SnapshotWrapper>
)
Snapshot.parameters = {
  chromatic: { disableSnapshot: false },
}
