import { Story } from "@storybook/react/types-6-0"
import { ChangeEvent, useState } from "react"
import { LabelSelect, LabelSelectProps } from "./LabelSelect"

export default {
  title: "Controls/Selects/LabelSelect",
  component: LabelSelect,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
}

const Template: Story<LabelSelectProps> = (args) => (
  <LabelSelect {...args}>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
  </LabelSelect>
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

const ControlledTemplate: Story<LabelSelectProps> = (args) => {
  const [value, setValue] = useState("")

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setValue(e.target.value)
  }

  return (
    <LabelSelect value={value} onChange={handleChange} {...args}>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </LabelSelect>
  )
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  label: "Label",
  value: "option2",
}
