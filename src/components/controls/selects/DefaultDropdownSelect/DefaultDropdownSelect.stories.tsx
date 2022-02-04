import { Story } from "@storybook/react/types-6-0"
import * as React from "react"
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
  <DefaultDropdownSelect {...args}>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
  </DefaultDropdownSelect>
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

const ControlledTemplate: Story<DefaultDropdownSelectProps> = (args) => {
  const [value, setValue] = useState("")

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value)
  }

  return (
    <DefaultDropdownSelect value={value} onChange={handleChange} {...args}>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </DefaultDropdownSelect>
  )
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  value: "option2",
}
