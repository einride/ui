import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { Calendar } from "./Calendar"

export default {
  title: "Controls/Dates/Calendar",
  component: Calendar,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof Calendar>

const Template: ComponentStory<typeof Calendar> = (args) => {
  const { value: defaultValue } = args
  const [value, setValue] = useState<Date | null>(defaultValue || null)
  return <Calendar {...args} value={value} onChange={setValue} />
}

export const Default = Template.bind({})
Default.args = {
  label: "Label",
}

export const DefaultValue = Template.bind({})
DefaultValue.args = {
  label: "Label",
  value: new Date(),
}
