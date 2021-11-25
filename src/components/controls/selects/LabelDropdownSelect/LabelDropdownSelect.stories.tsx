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
  <LabelDropdownSelect {...args} />
)

export const Default = Template.bind({})
Default.args = {
  label: "Label",
  options: [
    { text: "Option 1", value: "Option1" },
    { text: "Option 2", value: "Option2" },
    { text: "Option 3", value: "Option3" },
  ],
}

export const Placeholder = Template.bind({})
Placeholder.args = {
  label: "Label",
  options: [
    { text: "Option 1", value: "Option1" },
    { text: "Option 2", value: "Option2" },
    { text: "Option 3", value: "Option3" },
  ],
  placeholder: "Placeholder...",
}

export const DefaultValue = Template.bind({})
DefaultValue.args = {
  label: "Label",
  options: [
    { text: "Option 1", value: "Option1" },
    { text: "Option 2", value: "Option2" },
    { text: "Option 3", value: "Option3" },
  ],
  defaultValue: "Option2",
}

const ControlledTemplate: Story<LabelDropdownSelectProps> = (args) => {
  const [value, setValue] = useState("")

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value)
  }

  return <LabelDropdownSelect value={value} onChange={handleChange} {...args} />
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  label: "Label",
  options: [
    { text: "Option 1", value: "Option1" },
    { text: "Option 2", value: "Option2" },
    { text: "Option 3", value: "Option3" },
  ],
  value: "Option2",
}
