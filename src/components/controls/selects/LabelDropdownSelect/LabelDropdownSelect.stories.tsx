import { Story } from "@storybook/react/types-6-0"
import { ChangeEvent, useState } from "react"
import {
  LabelDropdownSelect,
  LabelDropdownSelectProps,
} from "./LabelDropdownSelect"

export default {
  title: "Controls/Selects/LabelDropdownSelect",
  component: LabelDropdownSelect,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=91%3A41",
    },
  },
}

const Template: Story<LabelDropdownSelectProps> = (args) => (
  <LabelDropdownSelect {...args}>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
  </LabelDropdownSelect>
)

export const Default = Template.bind({})
Default.args = {
  label: "Label",
}

export const Placeholder = Template.bind({})
Placeholder.args = {
  label: "Label",
  placeholder: "Placeholder...",
}

export const DefaultValue = Template.bind({})
DefaultValue.args = {
  label: "Label",
  defaultValue: "option2",
}

const ControlledTemplate: Story<LabelDropdownSelectProps> = (args) => {
  const [value, setValue] = useState("")

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value)
  }

  return (
    <LabelDropdownSelect value={value} onChange={handleChange} {...args}>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </LabelDropdownSelect>
  )
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  label: "Label",
  value: "option2",
}
