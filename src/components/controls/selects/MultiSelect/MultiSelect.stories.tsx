import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { useState } from "react"
import { MultiSelect } from "./MultiSelect"
import { getMockData } from "./MultiSelect.mocks"

export default {
  title: "Controls/Selects/MultiSelect",
  component: MultiSelect,
  argTypes: { onSelectionChange: { action: "onSelectionChange" } },
} as ComponentMeta<typeof MultiSelect>

const basicOptions = getMockData(3)
const largeDataset = getMockData(32)

const Template: ComponentStory<typeof MultiSelect<(typeof basicOptions)[0]>> = (args) => {
  return <MultiSelect {...args} />
}

export const Basic = Template.bind({})
Basic.args = {
  label: "Label",
  options: basicOptions,
}

export const DontClearAfterSelect = Template.bind({})
DontClearAfterSelect.args = {
  ...Basic.args,
  clearSearchAfterSelect: false,
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  options: basicOptions,
  "aria-label": "Label",
}

export const LargeDataset = Template.bind({})
LargeDataset.args = {
  ...Basic.args,
  options: largeDataset,
}

const ControlledTemplate: ComponentStory<typeof MultiSelect<(typeof basicOptions)[0]>> = (args) => {
  const [selectedOption, setSelectedOption] = useState([basicOptions[0]])
  return (
    <MultiSelect
      {...args}
      onSelectionChange={(options) => setSelectedOption(options)}
      value={selectedOption}
    />
  )
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  ...Basic.args,
  options: basicOptions,
}

export const Message = Template.bind({})
Message.args = {
  ...Basic.args,
  message: "Message.",
}

export const ErrorMessage = Template.bind({})
ErrorMessage.args = {
  ...Basic.args,
  message: "Error Message.",
  status: "fail",
}

export const Mouse = Template.bind({})
Mouse.args = {
  ...Basic.args,
  inputProps: {
    "data-testid": "input-1",
  },
  optionProps: {
    "data-testid": "options",
  },
  clearButtonProps: {
    "data-testid": "clear-button",
  },
}
Mouse.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const inputField = canvas.getByTestId("input-1")
  await userEvent.click(inputField)
  await expect(inputField).toHaveFocus()
  const options = canvas.getAllByTestId("options")
  await expect(options.length).toBe(3)
  await userEvent.click(options[1])
  await expect(options[1].getAttribute("aria-selected")).toBe("true")
  await userEvent.click(options[2])
  await expect(options[1].getAttribute("aria-selected")).toBe("true")
  await expect(options[2].getAttribute("aria-selected")).toBe("true")
  await userEvent.click(options[1])
  await expect(options[1].getAttribute("aria-selected")).toBe("false")
  await expect(options[2].getAttribute("aria-selected")).toBe("true")
  const clearButton = canvas.getByTestId("clear-button")
  await userEvent.click(clearButton)
  await expect(inputField).toHaveFocus()
  await expect(options[2].getAttribute("aria-selected")).toBe("false")
  await userEvent.click(clearButton)
  await expect(inputField).not.toHaveFocus()
}

export const Keyboard = Template.bind({})
Keyboard.args = {
  ...Mouse.args,
  inputProps: {
    "data-testid": "input-1",
  },
  optionProps: {
    "data-testid": "options",
  },
}
Keyboard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const inputField = canvas.getByTestId("input-1")
  inputField.focus()
  await userEvent.type(inputField, "dazzl", { delay: 10 })
  await userEvent.keyboard("[ArrowDown]")
  await userEvent.keyboard("[Enter]")
  const options = canvas.getAllByTestId("options")
  await expect(options[2].getAttribute("aria-selected")).toBe("true")
  // hit clear button
  await userEvent.keyboard("[Tab]")
  await userEvent.keyboard("[Enter]")
  await expect(options[2].getAttribute("aria-selected")).toBe("false")

  await userEvent.keyboard("[ArrowDown]")
  await userEvent.keyboard("[Enter]")
  await expect(options[1].getAttribute("aria-selected")).toBe("true")
  await userEvent.keyboard("[ArrowDown]")
  await userEvent.keyboard("[Enter]")
  await expect(options[1].getAttribute("aria-selected")).toBe("true")
  await expect(options[2].getAttribute("aria-selected")).toBe("true")
  await userEvent.keyboard("[Backspace]")
  await userEvent.keyboard("[Backspace]")
  await expect(options[1].getAttribute("aria-selected")).toBe("true")
  await expect(options[2].getAttribute("aria-selected")).toBe("false")
  await userEvent.keyboard("[ArrowDown]")
  await userEvent.keyboard("[Enter]")
  await expect(options[0].getAttribute("aria-selected")).toBe("true")
  await expect(options[1].getAttribute("aria-selected")).toBe("true")
  await userEvent.keyboard("[ArrowLeft]")
  await userEvent.keyboard("[ArrowLeft]")
  await userEvent.keyboard("[Backspace]")
  await expect(options[0].getAttribute("aria-selected")).toBe("true")
  await expect(options[1].getAttribute("aria-selected")).toBe("false")
  await userEvent.keyboard("[Backspace]")
  await userEvent.keyboard("[Backspace]")
  await expect(options[0].getAttribute("aria-selected")).toBe("false")
  await userEvent.keyboard("[Escape]")
  await expect(inputField).not.toHaveFocus()
}
