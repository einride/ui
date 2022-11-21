import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { useState } from "react"
import { Checkbox } from "./Checkbox"

export default {
  title: "Controls/Checkboxes/Checkbox",
  component: Checkbox,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof Checkbox>

const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: "Label",
}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const checkbox = canvas.getByRole("checkbox", { name: "Label" })
  await expect(checkbox).toBeInTheDocument()
}

const ControlledTemplate: ComponentStory<typeof Checkbox> = (args) => {
  const [checked, setChecked] = useState(true)
  return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  ...Basic.args,
}
Controlled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const checkbox = canvas.getByRole("checkbox", { name: "Label" })
  await expect(checkbox).toBeInTheDocument()
}

export const Mouse = Template.bind({})
Mouse.args = {
  ...Basic.args,
}
Mouse.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const checkbox = canvas.getByRole("checkbox", { name: "Label" })
  await expect(checkbox).not.toBeChecked()
  await userEvent.click(checkbox)
  await expect(checkbox).toBeChecked()
  await userEvent.click(checkbox)
  await expect(checkbox).not.toBeChecked()
}

export const Keyboard = ControlledTemplate.bind({})
Keyboard.args = {
  ...Basic.args,
}
Keyboard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const checkbox = canvas.getByRole("checkbox", { name: "Label" })
  await expect(checkbox).toBeChecked()
  await expect(checkbox).not.toHaveFocus()
  await userEvent.tab()
  await expect(checkbox).toHaveFocus()
}
