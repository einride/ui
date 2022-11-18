import { parseDate } from "@internationalized/date"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { DatePicker } from "./DatePicker"

export default {
  title: "Controls/Dates/DatePicker",
  component: DatePicker,
} as ComponentMeta<typeof DatePicker>

const Template: ComponentStory<typeof DatePicker> = (args) => {
  return <DatePicker {...args} />
}

export const Basic = Template.bind({})
Basic.args = {
  label: "Label",
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  "aria-label": "Label",
}

const ControlledTemplate: ComponentStory<typeof DatePicker> = (args) => {
  const [value, setValue] = useState(parseDate("2022-10-02"))
  return <DatePicker {...args} value={value} onChange={setValue} />
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  ...Basic.args,
}
