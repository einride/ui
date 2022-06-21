import { Story } from "@storybook/react/types-6-0"
import { ChangeEvent, useState } from "react"
import { Select, SelectProps } from "./Select"

export default {
  title: "Controls/Selects/Select",
  component: Select,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
}

const Template: Story<SelectProps> = (args) => (
  <Select {...args}>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
  </Select>
)

export const Default = Template.bind({})
Default.args = {
  "aria-label": "A dropdown select",
}

export const Placeholder = Template.bind({})
Placeholder.args = {
  "aria-label": "A dropdown select with a placeholder",
  placeholder: "Placeholder...",
}

export const DefaultValue = Template.bind({})
DefaultValue.args = {
  "aria-label": "A dropdown select with a default value",
  defaultValue: "option2",
}

const ControlledTemplate: Story<SelectProps> = (args) => {
  const [value, setValue] = useState("")

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setValue(e.target.value)
  }

  return (
    <Select value={value} onChange={handleChange} {...args}>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  )
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  value: "option2",
}
