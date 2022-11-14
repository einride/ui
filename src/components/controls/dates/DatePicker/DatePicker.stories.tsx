import { parseDate } from "@internationalized/date"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { DatePicker } from "./DatePicker"

export default {
  title: "Controls/Dates/DatePicker",
  component: DatePicker,
} as ComponentMeta<typeof DatePicker>

const ControlledTemplate: ComponentStory<typeof DatePicker> = (args) => {
  const [value, setValue] = useState(parseDate("2022-10-10"))
  return <DatePicker {...args} value={value} onChange={setValue} />
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  label: "Label",
}
