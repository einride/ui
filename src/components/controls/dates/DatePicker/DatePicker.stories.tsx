import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { DatePicker } from "./DatePicker"

export default {
  title: "Controls/Dates/DatePicker",
  component: DatePicker,
} as ComponentMeta<typeof DatePicker>

const Template: ComponentStory<typeof DatePicker> = (args) => <DatePicker {...args} />

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: "Label",
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  "aria-label": "Label",
  placeholder: "Placeholder",
}

const ControlledTemplate: ComponentStory<typeof DatePicker> = (args) => {
  const [value, setValue] = useState(new Date())
  return <DatePicker {...args} value={value} onChange={setValue} />
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  ...WithLabel.args,
}
