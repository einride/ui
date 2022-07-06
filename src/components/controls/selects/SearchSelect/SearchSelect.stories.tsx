import { Story } from "@storybook/react/types-6-0"
import { useState } from "react"
import { Paragraph } from "../../../typography/Paragraph/Paragraph"
import { SearchSelect, SearchSelectProps } from "./SearchSelect"

export default {
  title: "Controls/Selects/SearchSelect",
  component: SearchSelect,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
}

const OPTIONS = [
  {
    key: "option-1",
    label: <Paragraph>Option 1</Paragraph>,
    value: "Option 1",
    description: "description one",
  },
  {
    key: "option-2",
    label: <Paragraph>Option 2</Paragraph>,
    value: "Option 2",
    description: "description two",
  },
  {
    key: "option-3",
    label: <Paragraph>Option 3</Paragraph>,
    value: "Option 3",
    description: "description three",
  },
]

const Template: Story<SearchSelectProps<typeof OPTIONS[0]>> = (args) => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <SearchSelect {...args} onSearchChange={(text) => setSearchTerm(text)} value={searchTerm} />
  )
}

export const Default = Template.bind({})
Default.args = {
  options: OPTIONS,
}

export const Filterable = Template.bind({})
Filterable.args = {
  filter: (value, option) =>
    option.value.toLowerCase().trim().includes(value.toLowerCase().trim()) ||
    option.description.toLowerCase().trim().includes(value.toLowerCase().trim()),
  options: OPTIONS,
  isFilterable: true,
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  options: OPTIONS,
  label: "Label",
}

export const WithLabelFilterable = Template.bind({})
WithLabelFilterable.args = {
  filter: (value, option) =>
    option.value.toLowerCase().trim().includes(value.toLowerCase().trim()) ||
    option.description.toLowerCase().trim().includes(value.toLowerCase().trim()),
  options: OPTIONS,
  isFilterable: true,
  label: "Label",
}
