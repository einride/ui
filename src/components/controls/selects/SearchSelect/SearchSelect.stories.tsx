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

const basicOptions = [
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

const Template: ComponentStory<typeof SearchSelect<(typeof basicOptions)[0]>> = (args) => {
  const [searchTerm, setSearchTerm] = useState("")
  return (
    <SearchSelect {...args} onSearchChange={(text) => setSearchTerm(text)} value={searchTerm} />
  )
}

export const Basic = Template.bind({})
Basic.args = {
  label: "Label",
  options: basicOptions,
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  options: basicOptions,
}

const inputValueOptions = [
  {
    label: <Paragraph>Snowfall guzzler drapery</Paragraph>,
    inputValue: "Snowfall guzzler drapery",
    value: "snowfall-guzzler-drapery",
    description: "description one",
  },
  {
    label: <Paragraph>Remorse strike tartly</Paragraph>,
    inputValue: "Remorse strike tartly",
    value: "remorse-strike-tartly",
    description: "description two",
  },
  {
    label: <Paragraph>Operator dazzling breeding</Paragraph>,
    inputValue: "Operator dazzling breeding",
    value: "operator-dazzling-breeding",
    description: "description three",
  },
]

const InputValueTemplate: ComponentStory<typeof SearchSelect<(typeof inputValueOptions)[0]>> = (
  args,
) => {
  const [searchTerm, setSearchTerm] = useState("")
  return (
    <SearchSelect {...args} onSearchChange={(text) => setSearchTerm(text)} value={searchTerm} />
  )
}

export const InputValue = InputValueTemplate.bind({})
InputValue.args = {
  label: "Label",
  options: inputValueOptions,
}

export const CustomFilter = Template.bind({})
CustomFilter.args = {
  ...Basic.args,
  filter: (value, option) =>
    option.value.toLowerCase().trim().includes(value.toLowerCase().trim()) ||
    option.description.toLowerCase().trim().includes(value.toLowerCase().trim()),
}
