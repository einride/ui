import { Story } from "@storybook/react/types-6-0"
import { ChangeEvent, useState } from "react"
import {
  DefaultDropdownSelect,
  DefaultDropdownSelectProps,
} from "./DefaultDropdownSelect"

export default {
  title: "Controls/Selects/DefaultDropdownSelect",
  component: DefaultDropdownSelect,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=1237%3A108",
    },
  },
}

const Template: Story<DefaultDropdownSelectProps> = (args) => (
  <DefaultDropdownSelect {...args} />
)

export const Default = Template.bind({})
Default.args = {
  options: [
    { key: "Option1", value: "Option 1" },
    { key: "Option2", value: "Option 2" },
    { key: "Option3", value: "Option 3" },
  ],
}

export const Placeholder = Template.bind({})
Placeholder.args = {
  options: [
    { text: "Option 1", value: "Option1" },
    { text: "Option 2", value: "Option2" },
    { text: "Option 3", value: "Option3" },
  ],
  placeholder: "Placeholder...",
}

export const DefaultValue = Template.bind({})
DefaultValue.args = {
  options: [
    { text: "Option 1", value: "Option1" },
    { text: "Option 2", value: "Option2" },
    { text: "Option 3", value: "Option3" },
  ],
  defaultValue: "Option2",
}

const ControlledTemplate: Story<DefaultDropdownSelectProps> = (args) => {
  const [value, setValue] = useState("")

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value)
  }

  return (
    <DefaultDropdownSelect value={value} onChange={handleChange} {...args} />
  )
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  options: [
    { text: "Option 1", value: "Option1" },
    { text: "Option 2", value: "Option2" },
    { text: "Option 3", value: "Option3" },
  ],
  value: "Option2",
}
