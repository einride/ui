import { ComponentMeta, ComponentStory } from "@storybook/react"
import { DatePicker } from "./DatePicker"

export default {
  title: "Controls/Dates/DatePicker",
  component: DatePicker,
} as ComponentMeta<typeof DatePicker>

const Template: ComponentStory<typeof DatePicker> = (args) => {
  return <DatePicker {...args} />
}

export const Default = Template.bind({})
Default.args = {
  label: "Label",
}
