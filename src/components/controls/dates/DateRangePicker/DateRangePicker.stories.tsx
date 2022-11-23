import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { DateRangePicker, DateRangePickerValue } from "./DateRangePicker"

export default {
  title: "Controls/Dates/DateRangePicker",
  component: DateRangePicker,
} as ComponentMeta<typeof DateRangePicker>

const Template: ComponentStory<typeof DateRangePicker> = (args) => <DateRangePicker {...args} />

export const Basic = Template.bind({})
Basic.args = {
  label: "Label",
}

const ControlledTemplate: ComponentStory<typeof DateRangePicker> = (args) => {
  const [value, setValue] = useState<DateRangePickerValue>([
    new Date(2021, 11, 1),
    new Date(2021, 11, 5),
  ])
  return <DateRangePicker {...args} value={value} onChange={setValue} />
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  ...Basic.args,
}
