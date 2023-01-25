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
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const label = canvas.getByText("Label")
  const inputField = canvas.getByRole("textbox")
  await userEvent.click(label)
  await expect(inputField).toHaveFocus()
}

export const DontClearAfterSelect = Template.bind({})
DontClearAfterSelect.args = {
  ...Basic.args,
  clearSearchAfterSelect: false,
}
DontClearAfterSelect.play = async ({ canvasElement }) => {
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
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  options: basicOptions,
  "aria-label": "Label",
}
WithoutLabel.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const inputField = canvas.getByRole("textbox") as HTMLInputElement
  await inputField.focus()
  const combobox = await canvas.getByRole("combobox", { expanded: true })
  await expect(combobox).toBeTruthy()
}

export const LargeDataset = Template.bind({})
LargeDataset.args = {
  ...Basic.args,
  options: largeDataset,
}
LargeDataset.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const inputField = canvas.getByRole("textbox") as HTMLInputElement
  await inputField.focus()
  const combobox = await canvas.getByRole("combobox", { expanded: true })
  await expect(combobox).toBeTruthy()
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
Controlled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const selectedOption = canvas.getByRole("button", { name: "Snowfall guzzler drapery" })

  await expect(selectedOption).toBeTruthy()
}

export const Message = Template.bind({})
Message.args = {
  ...Basic.args,
  message: "Message.",
}
Message.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const inputField = canvas.getByRole("textbox")
  const errorMessage = canvas.getByText("Message.")

  await expect(inputField).toBeTruthy()
  await expect(errorMessage).toBeTruthy()
}

export const ErrorMessage = Template.bind({})
ErrorMessage.args = {
  ...Basic.args,
  message: "Error Message.",
  status: "fail",
}
ErrorMessage.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const inputField = canvas.getByRole("textbox")
  const errorMessage = canvas.getByText("Error Message.")

  await expect(inputField).toBeTruthy()
  await expect(errorMessage).toBeTruthy()
}

export const Mouse = Template.bind({})
Mouse.args = {
  ...Basic.args,
}
Mouse.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const inputField = canvas.getByRole("textbox")
  await userEvent.click(inputField)
  await expect(inputField).toHaveFocus()
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
}

export const Keyboard = Template.bind({})
Keyboard.args = {
  ...Mouse.args,
}
Keyboard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const inputField = canvas.getByRole("textbox")
  inputField.focus()
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
}
