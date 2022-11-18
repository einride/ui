import { ComponentMeta, ComponentStory } from "@storybook/react"
import { DateInput } from "./DateInput"

export default {
  title: "Controls/Dates/DateInput",
  component: DateInput,
} as ComponentMeta<typeof DateInput>

const Template: ComponentStory<typeof DateInput> = (args) => {
  return <DateInput {...args} />
}

export const Default = Template.bind({})
Default.args = {
  label: "Label",
}
