import { faker } from "@faker-js/faker"
import { expect, jest } from "@storybook/jest"
import { ComponentMeta, ComponentStory, ComponentStoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
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
  render: (args) => <Template {...args} />,
} satisfies ComponentMeta<typeof SearchSelect>

type Story = ComponentStoryObj<typeof SearchSelect>

const basicOptions = getMockData(3)
const largeDataset = getMockData(32)

const Template: ComponentStory<typeof SearchSelect<(typeof basicOptions)[0]>> = (args) => {
  const [searchTerm, setSearchTerm] = useState("")
  return (
    <SearchSelect {...args} onSearchChange={(text) => setSearchTerm(text)} value={searchTerm} />
  )
}

export const Basic = {
  args: {
    label: "Label",
    options: basicOptions,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByText("Label")).toBeInTheDocument()
    await expect(canvas.getByRole("textbox")).toBeInTheDocument()
  },
} satisfies Story

export const LargeDataset = {
  args: {
    label: "Label",
    options: largeDataset,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("textbox")).toBeInTheDocument()
  },
} satisfies Story

export const WithoutLabel = {
  args: {
    options: basicOptions,
    placeholder: "Placeholder",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("textbox")).toBeInTheDocument()
  },
} satisfies Story

const inputValueOptions = getMockData(3, true)
const InputValueTemplate: ComponentStory<typeof SearchSelect<(typeof inputValueOptions)[0]>> = (
  args,
) => {
  const [searchTerm, setSearchTerm] = useState("")
  return (
    <SearchSelect {...args} onSearchChange={(text) => setSearchTerm(text)} value={searchTerm} />
  )
}

export const WithInputValue = {
  render: (args) => <InputValueTemplate {...args} />,
  args: {
    label: "Label",
    options: inputValueOptions,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("textbox")).toBeInTheDocument()
  },
} satisfies Story

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

type DescriptionStory = ComponentStoryObj<typeof SearchSelect<(typeof descriptionOptions)[0]>>

export const CustomFilter = {
  render: (args) => <DescriptionTemplate {...args} />,
  args: {
    ...Basic.args,
    options: descriptionOptions,
    filter: (value, option) =>
      option.value.toLowerCase().trim().includes(value.toLowerCase().trim()) ||
      option.description.toLowerCase().trim().includes(value.toLowerCase().trim()),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const inputField = canvas.getByRole("textbox")
    const label = canvas.getByText("Label")
    await userEvent.click(label)
    await userEvent.type(inputField, "DeScRiptiOn tHrEe", { delay: 10 })
    await userEvent.keyboard("[Enter]")
    await expect(inputField).toHaveValue("Operator dazzling breeding")
  },
} satisfies DescriptionStory

const onOptionSelect = jest.fn()
const onClearClick = jest.fn()
export const Mouse = {
  args: {
    label: "Label",
    options: basicOptions,
    onOptionSelect,
    onClearClick,
  },
  play: async ({ canvasElement }) => {
    onOptionSelect.mockClear()
    onClearClick.mockClear()
    const canvas = within(canvasElement)
    const label = canvas.getByText("Label")
    const inputField = canvas.getByRole("textbox")
    await userEvent.click(label)
    await expect(inputField).toHaveFocus()
    await expect(onOptionSelect).toHaveBeenCalledTimes(0)
    const option = canvas.getByText("Remorse strike tartly")
    await userEvent.click(option)
    await expect(inputField).toHaveValue("Remorse strike tartly")
    const clearButton = canvas.getByRole("button")
    await expect(onOptionSelect).toHaveBeenCalledTimes(1)
    await expect(onClearClick).toHaveBeenCalledTimes(0)
    await userEvent.click(clearButton)
    await expect(inputField).toHaveValue("")
    await expect(inputField).toHaveFocus()
    await expect(onClearClick).toHaveBeenCalledTimes(1)
    inputField.blur()
    await expect(onOptionSelect).toHaveBeenCalledTimes(1)
  },
} satisfies Story

export const Message = {
  args: {
    ...Basic.args,
    message: "Message.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole("textbox", { name: "Label" })
    await expect(input).toHaveAccessibleDescription("Message.")
    await expect(input).not.toHaveErrorMessage()
  },
} satisfies Story

export const ClearButtonProps = {
  render: (args) => <SearchSelect {...args} />,
  args: {
    value: "Value",
    clearButtonProps: { "data-testid": "testid" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const clearButton = canvas.getByRole("button")
    await expect(clearButton).toHaveAttribute("data-testid", "testid")
  },
} satisfies Story

export const Keyboard = {
  args: {
    label: "Label",
    options: basicOptions,
    onOptionSelect,
    onClearClick,
  },
  play: async ({ canvasElement }) => {
    onOptionSelect.mockClear()
    onClearClick.mockClear()
    const canvas = within(canvasElement)
    const inputField = canvas.getByRole("textbox")
    await userEvent.click(inputField)
    await expect(inputField).toHaveFocus()
    await userEvent.type(inputField, "operator", { delay: 10 })
    await expect(onOptionSelect).toHaveBeenCalledTimes(0)
    await userEvent.keyboard("[Enter]")
    await expect(inputField).toHaveValue("Operator dazzling breeding")
    await expect(onClearClick).toHaveBeenCalledTimes(0)
    await userEvent.keyboard("[Tab]")
    await userEvent.keyboard("[Enter]")
    await expect(onOptionSelect).toHaveBeenCalledTimes(1)
    await expect(inputField).toHaveValue("")
    await expect(inputField).toHaveFocus()
    await expect(onClearClick).toHaveBeenCalledTimes(1)
    await userEvent.keyboard("[Tab]")
    await expect(onOptionSelect).toHaveBeenCalledTimes(1)
  },
} satisfies Story
