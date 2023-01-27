import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within, userEvent } from "@storybook/testing-library"
import { useState } from "react"
import { Paragraph } from "../../../typography/Paragraph/Paragraph"
import { SearchSelect } from "./SearchSelect"
import { getMockData } from "./SearchSelect.mocks"

export default {
  title: "Controls/Selects/SearchSelect",
  component: SearchSelect,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof SearchSelect>

const basicOptions = getMockData(3)

const largeDataset = getMockData(32)

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
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const label = canvas.getByText("Label")
  const inputField = canvas.getByRole("textbox")
  await userEvent.click(label)
  await expect(inputField).toHaveFocus()
}

export const LargeDataset = Template.bind({})
LargeDataset.args = {
  label: "Label",
  options: largeDataset,
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  options: basicOptions,
}

const inputValueOptions = getMockData(3, true)

const InputValueTemplate: ComponentStory<typeof SearchSelect<(typeof inputValueOptions)[0]>> = (
  args,
) => {
  const [searchTerm, setSearchTerm] = useState("")
  return (
    <SearchSelect {...args} onSearchChange={(text) => setSearchTerm(text)} value={searchTerm} />
  )
}

export const WithInputValue = InputValueTemplate.bind({})
WithInputValue.args = {
  label: "Label",
  options: inputValueOptions,
}
WithInputValue.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const inputField = canvas.getByRole("textbox") as HTMLInputElement
  inputField.focus()
  await userEvent.keyboard("[ArrowDown]")
  await userEvent.keyboard("[Enter]")
  await expect(inputField.value).toBe("Snowfall guzzler drapery")
}

const descriptionOptions = [
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

const DescriptionTemplate: ComponentStory<typeof SearchSelect<(typeof descriptionOptions)[0]>> = (
  args,
) => {
  const [searchTerm, setSearchTerm] = useState("")
  return (
    <SearchSelect {...args} onSearchChange={(text) => setSearchTerm(text)} value={searchTerm} />
  )
}

export const CustomFilter = DescriptionTemplate.bind({})
CustomFilter.args = {
  ...Basic.args,
  options: descriptionOptions,
  filter: (value, option) =>
    option.value.toLowerCase().trim().includes(value.toLowerCase().trim()) ||
    option.description.toLowerCase().trim().includes(value.toLowerCase().trim()),
}
CustomFilter.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const inputField = canvas.getByRole("textbox") as HTMLInputElement
  inputField.focus()
  await userEvent.type(inputField, "DeScRiptiOn tHrEe", { delay: 10 })
  await userEvent.keyboard("[ArrowDown]")
  await userEvent.keyboard("[Enter]")
  await expect(inputField.value).toBe("Operator dazzling breeding")
}
