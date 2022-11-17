import { ComponentMeta, ComponentStory } from "@storybook/react"
import { useState } from "react"
import { Paragraph } from "../../../typography/Paragraph/Paragraph"
import { SearchSelect } from "./SearchSelect"

export default {
  title: "Controls/Selects/SearchSelect",
  component: SearchSelect,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof SearchSelect>

const OPTIONS = [
  {
    key: "option-1",
    label: <Paragraph>Snowfall guzzler drapery</Paragraph>,
    value: "Snowfall guzzler drapery",
    description: "description one",
  },
  {
    key: "option-2",
    label: <Paragraph>Remorse strike tartly</Paragraph>,
    value: "Remorse strike tartly",
    description: "description two",
  },
  {
    key: "option-3",
    label: <Paragraph>Operator dazzling breeding</Paragraph>,
    value: "Operator dazzling breeding",
    description: "description three",
  },
]

const Template: ComponentStory<typeof SearchSelect<typeof OPTIONS[0]>> = (args) => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <SearchSelect {...args} onSearchChange={(text) => setSearchTerm(text)} value={searchTerm} />
  )
}

export const Basic = Template.bind({})
Basic.args = {
  label: "Label",
  options: OPTIONS,
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  options: OPTIONS,
}

export const CustomFilter = Template.bind({})
CustomFilter.args = {
  ...Basic.args,
  filter: (value, option) =>
    option.value.toLowerCase().trim().includes(value.toLowerCase().trim()) ||
    option.description.toLowerCase().trim().includes(value.toLowerCase().trim()),
}
