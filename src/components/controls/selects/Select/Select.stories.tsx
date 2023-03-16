import { Meta, StoryObj } from "@storybook/react"
import { ChangeEvent, ComponentProps, useState } from "react"
import { Select } from "./Select"

const meta = {
  component: Select,
  args: {
    children: (
      <>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </>
    ),
  },
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

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

const ControlledTemplate = (args: ComponentProps<typeof Select>): JSX.Element => {
  const [value, setValue] = useState("")

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setValue(e.target.value)
  }

  return <Select value={value} onChange={handleChange} {...args} />
}

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...Basic.args,
    value: "option2",
  },
} satisfies Story

export const Prefix = {
  args: {
    ...Basic.args,
    prefix: <>Prefix:</>,
  },
} satisfies Story
