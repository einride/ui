import { ComponentMeta, ComponentStory } from "@storybook/react"
import { ChangeEvent, useState } from "react"
import { Select } from "./Select"

export default {
  title: "Controls/Selects/Select",
  component: Select,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => (
  <Select {...args}>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
  </Select>
)

export const Basic = Template.bind({})
Basic.args = {
  label: "Label",
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
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

const ControlledTemplate: ComponentStory<typeof Select> = (args) => {
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

export const Prefix = Template.bind({})
Prefix.args = {
  ...Basic,
  prefix: <>Prefix:</>,
  prefixWidth: 52,
}
