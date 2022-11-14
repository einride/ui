import { parseDate } from "@internationalized/date"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { DateInput } from "./DateInput"

export default {
  title: "Controls/Dates/DateInput",
  component: DateInput,
} as ComponentMeta<typeof DateInput>

const ControlledTemplate: ComponentStory<typeof DateInput> = (args) => {
  const [value, setValue] = useState(parseDate("2022-10-10"))
  return <DateInput {...args} value={value} onChange={setValue} />
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  label: "Label",
}
