import { ComponentMeta, ComponentStory, ComponentStoryObj } from "@storybook/react"
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
  render: (args) => <Template {...args} />,
} satisfies ComponentMeta<typeof Select>

type Story = ComponentStoryObj<typeof Select>

const Template: ComponentStory<typeof Select> = (args) => (
  <Select {...args}>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
  </Select>
)

export const Basic = {
  args: {
    label: "Label",
  },
} satisfies Story

export const WithoutLabel = {
  args: {
    "aria-label": "A dropdown select",
  },
} satisfies Story

export const Placeholder = {
  args: {
    "aria-label": "A dropdown select with a placeholder",
    placeholder: "Placeholder",
  },
} satisfies Story

export const DefaultValue = {
  args: {
    "aria-label": "A dropdown select with a default value",
    defaultValue: "option2",
  },
} satisfies Story

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

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    value: "option2",
  },
} satisfies Story

export const Prefix = {
  args: {
    ...Basic.args,
    prefix: <>Prefix:</>,
  },
} satisfies Story
