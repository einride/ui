import { faker } from "@faker-js/faker"
import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { ComponentProps, useState } from "react"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { Box } from "../../../layout/Box/Box"
import { MultiSelect } from "./MultiSelect"
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

const meta = {
  component: MultiSelect,
  argTypes: { onSelectionChange: { action: "onSelectionChange" } },
} satisfies Meta<typeof MultiSelect>

const basicOptions = getMockData(3)
const largeDataset = getMockData(32)

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    label: "Label",
    options: basicOptions,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText("Label")).toBeInTheDocument()
    expect(canvas.getByRole("textbox")).toBeInTheDocument()
  },
} satisfies Story

export const WithoutLabel = {
  args: {
    options: basicOptions,
    "aria-label": "Label",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByRole("textbox")).toBeInTheDocument()
  },
} satisfies Story

export const LargeDataset = {
  args: {
    ...Basic.args,
    options: largeDataset,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByRole("textbox")).toBeInTheDocument()
  },
} satisfies Story

const ControlledTemplate = (args: ComponentProps<typeof MultiSelect>): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState([basicOptions[0]])
  return (
    <MultiSelect
      {...args}
      onSelectionChange={(options) => setSelectedOption(options)}
      value={selectedOption}
    />
  )
}

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...Basic.args,
    options: basicOptions,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const selectedOption = canvas.getByRole("button", { name: "Snowfall guzzler drapery" })

    await expect(selectedOption).toBeInTheDocument()
  },
} satisfies Story

export const Message = {
  args: {
    ...Basic.args,
    message: "Message.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const inputField = canvas.getByRole("textbox")
    const message = canvas.getByText("Message.")

    await expect(inputField).toBeInTheDocument()
    await expect(message).toBeInTheDocument()
  },
} satisfies Story

export const SuccessMessage = {
  args: {
    ...Basic.args,
    message: "Success Message.",
    status: "success",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const inputField = canvas.getByRole("textbox")
    const successMessage = canvas.getByText("Success Message.")

    await expect(inputField).toBeInTheDocument()
    await expect(successMessage).toBeInTheDocument()
  },
} satisfies Story

export const ErrorMessage = {
  args: {
    ...Basic.args,
    message: "Error Message.",
    status: "fail",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const inputField = canvas.getByRole("textbox")
    const errorMessage = canvas.getByText("Error Message.")

    await expect(inputField).toBeInTheDocument()
    await expect(errorMessage).toBeInTheDocument()
  },
} satisfies Story

export const DontClearAfterSelect = {
  args: {
    ...Basic.args,
    clearSearchAfterSelect: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const inputField = canvas.getByRole("textbox") as HTMLInputElement
    inputField.focus()
    await userEvent.type(inputField, "SNOW", { delay: 10 })
    await userEvent.keyboard("[ArrowDown]")
    await userEvent.keyboard("[Enter]")
    await expect(inputField.value).toBe("SNOW")
    const selectedOption = canvas.getByRole("option", {
      selected: true,
      name: "Snowfall guzzler drapery",
    })
    await expect(selectedOption).toBeTruthy()
  },
} satisfies Story

export const Mouse = {
  args: {
    ...Basic.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const inputField = canvas.getByRole("textbox")
    const label = canvas.getByText("Label")
    await userEvent.click(label)
    await expect(inputField).toHaveFocus()
    const combobox = await canvas.getByRole("combobox", { expanded: true })
    await expect(combobox).toBeInTheDocument()
    const options = await canvas.getAllByRole("option")
    await expect(options.length).toBe(3)
    await userEvent.click(options[1])
    await expect(options[1].ariaSelected).toBe("true")
    await userEvent.click(options[2])
    await expect(options[1].ariaSelected).toBe("true")
    await expect(options[2].ariaSelected).toBe("true")
    await userEvent.click(options[1])
    await expect(options[1].ariaSelected).toBe("false")
    await expect(options[2].ariaSelected).toBe("true")
    const clearButton = canvas.getByRole("button", { name: "Clear input" })
    await userEvent.click(clearButton)
    await expect(inputField).toHaveFocus()
    await expect(options[2].ariaSelected).toBe("false")
    await userEvent.click(clearButton)
    await expect(inputField).not.toHaveFocus()
  },
} satisfies Story

export const Keyboard = {
  args: {
    ...Mouse.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const inputField = canvas.getByRole("textbox")
    await inputField.focus()
    const combobox = await canvas.getByRole("combobox", { expanded: true })
    await expect(combobox).toBeInTheDocument()
    await userEvent.type(inputField, "dazzl", { delay: 10 })
    await userEvent.keyboard("[ArrowDown]")
    await userEvent.keyboard("[Enter]")
    const options = await canvas.getAllByRole("option")
    await expect(options[2].ariaSelected).toBe("true")
    // hit clear button
    await userEvent.keyboard("[Tab]")
    await userEvent.keyboard("[Enter]")
    await expect(options[2].ariaSelected).toBe("false")

    await userEvent.keyboard("[ArrowDown]")
    await userEvent.keyboard("[Enter]")
    await expect(options[1].ariaSelected).toBe("true")
    await userEvent.keyboard("[ArrowDown]")
    await userEvent.keyboard("[Enter]")
    await expect(options[1].ariaSelected).toBe("true")
    await expect(options[2].ariaSelected).toBe("true")
    await userEvent.keyboard("[Backspace]")
    await userEvent.keyboard("[Backspace]")
    await expect(options[1].ariaSelected).toBe("true")
    await expect(options[2].ariaSelected).toBe("false")
    await userEvent.keyboard("[ArrowDown]")
    await userEvent.keyboard("[Enter]")
    await expect(options[0].ariaSelected).toBe("true")
    await expect(options[1].ariaSelected).toBe("true")
    await userEvent.keyboard("[ArrowLeft]")
    await userEvent.keyboard("[ArrowLeft]")
    await userEvent.keyboard("[Backspace]")
    await expect(options[0].ariaSelected).toBe("true")
    await expect(options[1].ariaSelected).toBe("false")
    await userEvent.keyboard("[Backspace]")
    await userEvent.keyboard("[Backspace]")
    await expect(options[0].ariaSelected).toBe("false")
    await userEvent.keyboard("[Escape]")
    await expect(inputField).not.toHaveFocus()
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper alignItems="stretch">
      {[Basic, WithoutLabel, Message, SuccessMessage, ErrorMessage].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <MultiSelect key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies StoryObj
