import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { useState } from "react"
import { RangeCalendar } from "./RangeCalendar"

export default {
  title: "Controls/Dates/RangeCalendar",
  component: RangeCalendar,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof RangeCalendar>

const Template: ComponentStory<typeof RangeCalendar> = (args) => {
  const { value: defaultValue } = args
  const [value, setValue] = useState<[Date | null, Date | null]>(defaultValue || [null, null])
  return (
    <RangeCalendar
      {...args}
      value={value}
      onChange={setValue}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  value: [null, null],
}
Default.play = async ({ args }) => {
  expect(args.value).toEqual([null, null])
}

export const DefaultValue = Template.bind({})
DefaultValue.args = {
  value: [new Date(new Date().setDate(1)), new Date(new Date().setDate(10))],
}
DefaultValue.play = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement)
  expect(args.value[0]).toBeTruthy()
  expect(args.value[1]).toBeTruthy()

  const currentDayButton = canvas.getByRole("button", { name: "10" })
  expect(currentDayButton.getAttribute("data-selected")).toBe("true")
}
