import { faker } from "@faker-js/faker"
import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within, userEvent } from "@storybook/testing-library"
import { useState } from "react"
import { Box } from "../../../layout/Box/Box"
import { SearchSelect } from "./SearchSelect"
import { BaseOption } from "./types"

const mockContents = [
  "Snowfall guzzler drapery",
  "Remorse strike tartly",
  "Operator dazzling breeding",
  "Egestas Lorem Ullamcorper",
  "Ornare Egestas Ridiculus",
  "Ridiculus Elit Inceptos",
]

function getMockData(count: number, withInputValue?: boolean): BaseOption[] {
  return [...Array(count)].map((_, index) => {
    const content =
      mockContents[index] ?? faker.random.words(faker.datatype.number({ min: 1, max: 6 }))
    return {
      label: <Box>{content}</Box>,
      value: withInputValue ? faker.datatype.uuid() : content,
      ...(withInputValue ? { inputValue: content } : {}),
    }
  })
}

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
  await expect(canvas.getByText("Label")).toBeInTheDocument()
  await expect(canvas.getByRole("textbox")).toBeInTheDocument()
}

export const LargeDataset = Template.bind({})
LargeDataset.args = {
  label: "Label",
  options: largeDataset,
}
LargeDataset.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await expect(canvas.getByRole("textbox")).toBeInTheDocument()
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  options: basicOptions,
}
WithoutLabel.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await expect(canvas.getByRole("textbox")).toBeInTheDocument()
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
  await expect(canvas.getByRole("textbox")).toBeInTheDocument()
}

const descriptionOptions = [
  {
    label: <Box>Snowfall guzzler drapery</Box>,
    inputValue: "Snowfall guzzler drapery",
    value: "snowfall-guzzler-drapery",
    description: "description one",
  },
  {
    label: <Box>Remorse strike tartly</Box>,
    inputValue: "Remorse strike tartly",
    value: "remorse-strike-tartly",
    description: "description two",
  },
  {
    label: <Box>Operator dazzling breeding</Box>,
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
  const inputField = canvas.getByRole("textbox")
  const label = canvas.getByText("Label")
  await userEvent.click(label)
  await userEvent.type(inputField, "DeScRiptiOn tHrEe", { delay: 10 })
  await userEvent.keyboard("[Enter]")
  await expect(inputField).toHaveValue("Operator dazzling breeding")
}

export const Mouse = Template.bind({})
Mouse.args = {
  label: "Label",
  options: basicOptions,
}
Mouse.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const label = canvas.getByText("Label")
  const inputField = canvas.getByRole("textbox")
  await userEvent.click(label)
  await expect(inputField).toHaveFocus()
  const option = canvas.getByText("Remorse strike tartly")
  await userEvent.click(option)
  await expect(inputField).toHaveValue("Remorse strike tartly")
  const clearButton = canvas.getByRole("button")
  await userEvent.click(clearButton)
  await expect(inputField).toHaveValue("")
  await expect(inputField).toHaveFocus()
}

export const Keyboard = Template.bind({})
Keyboard.args = {
  label: "Label",
  options: basicOptions,
}
Keyboard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const inputField = canvas.getByRole("textbox")
  await userEvent.click(inputField)
  await expect(inputField).toHaveFocus()
  await userEvent.type(inputField, "operator", { delay: 10 })
  await userEvent.keyboard("[Enter]")
  await expect(inputField).toHaveValue("Operator dazzling breeding")
  await userEvent.keyboard("[Tab]")
  await userEvent.keyboard("[Enter]")
  await expect(inputField).toHaveValue("")
  await expect(inputField).toHaveFocus()
}
