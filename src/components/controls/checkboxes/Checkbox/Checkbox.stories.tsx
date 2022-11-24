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

export const WithLabel = Template.bind({})
WithLabel.args = {
  children: "Label",
}
WithLabel.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const checkbox = canvas.getByRole("checkbox", { name: "Label" })
  await expect(checkbox).not.toBeChecked()
}

export const DefaultChecked = Template.bind({})
DefaultChecked.args = {
  ...WithLabel.args,
  checked: true,
}
DefaultChecked.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const checkbox = canvas.getByRole("checkbox", { name: "Label" })
  await expect(checkbox).toBeChecked()
}

const ControlledTemplate: ComponentStory<typeof Checkbox> = (args) => {
  const [checked, setChecked] = useState(false)
  return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  ...WithLabel.args,
}
Controlled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const checkbox = canvas.getByRole("checkbox", { name: "Label" })
  await expect(checkbox).not.toBeChecked()
}

export const Mouse = Template.bind({})
Mouse.args = {
  ...WithLabel.args,
}
Mouse.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const checkbox = canvas.getByRole("checkbox", { name: "Label" })
  await expect(checkbox).not.toBeChecked()
  await expect(checkbox).not.toHaveFocus()
  await userEvent.click(checkbox)
  await expect(checkbox).toBeChecked()
  await expect(checkbox).toHaveFocus()
  await userEvent.click(checkbox)
  await expect(checkbox).not.toBeChecked()
}

export const Keyboard = ControlledTemplate.bind({})
Keyboard.args = {
  ...WithLabel.args,
}
Keyboard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const checkbox = canvas.getByRole("checkbox", { name: "Label" })
  await expect(checkbox).not.toBeChecked()
  await expect(checkbox).not.toHaveFocus()
  await userEvent.tab()
  await expect(checkbox).toHaveFocus()
  await expect(checkbox).not.toBeChecked()
  await userEvent.keyboard("[Space]")
  await expect(checkbox).toBeChecked()
}

const GroupTemplate: ComponentStory<typeof Checkbox> = () => {
  return (
    <>
      <Checkbox name="name">Label 1</Checkbox>
      <Checkbox name="name">Label 2</Checkbox>
      <Checkbox name="name">Label 3</Checkbox>
    </>
  )
}
export const GroupMouse = GroupTemplate.bind({})
GroupMouse.args = {
  ...WithLabel.args,
}
GroupMouse.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const checkbox1 = canvas.getByRole("checkbox", { name: "Label 1" })
  const checkbox2 = canvas.getByRole("checkbox", { name: "Label 2" })
  const checkbox3 = canvas.getByRole("checkbox", { name: "Label 3" })
  await expect(checkbox1).not.toBeChecked()
  await expect(checkbox2).not.toBeChecked()
  await expect(checkbox3).not.toBeChecked()
  await userEvent.click(checkbox1)
  await expect(checkbox1).toBeChecked()
  await expect(checkbox2).not.toBeChecked()
  await expect(checkbox3).not.toBeChecked()
  await userEvent.click(checkbox2)
  await expect(checkbox1).toBeChecked()
  await expect(checkbox2).toBeChecked()
  await expect(checkbox3).not.toBeChecked()
  await userEvent.click(checkbox3)
  await expect(checkbox1).toBeChecked()
  await expect(checkbox2).toBeChecked()
  await expect(checkbox3).toBeChecked()
  await userEvent.click(checkbox2)
  await expect(checkbox1).toBeChecked()
  await expect(checkbox2).not.toBeChecked()
  await expect(checkbox3).toBeChecked()
}

export const GroupKeyboard = GroupTemplate.bind({})
GroupKeyboard.args = {
  ...WithLabel.args,
}
GroupKeyboard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const checkbox1 = canvas.getByRole("checkbox", { name: "Label 1" })
  const checkbox2 = canvas.getByRole("checkbox", { name: "Label 2" })
  const checkbox3 = canvas.getByRole("checkbox", { name: "Label 3" })
  await expect(checkbox1).not.toBeChecked()
  await expect(checkbox2).not.toBeChecked()
  await expect(checkbox3).not.toBeChecked()
  await expect(checkbox1).not.toHaveFocus()
  await expect(checkbox2).not.toHaveFocus()
  await expect(checkbox3).not.toHaveFocus()
  await userEvent.tab()
  await expect(checkbox1).toHaveFocus()
  await expect(checkbox2).not.toHaveFocus()
  await expect(checkbox3).not.toHaveFocus()
  await userEvent.keyboard("[Space]")
  await expect(checkbox1).toBeChecked()
  await expect(checkbox2).not.toBeChecked()
  await expect(checkbox3).not.toBeChecked()
  await userEvent.tab()
  await expect(checkbox1).not.toHaveFocus()
  await expect(checkbox2).toHaveFocus()
  await expect(checkbox3).not.toHaveFocus()
  await userEvent.keyboard("[Space]")
  await expect(checkbox1).toBeChecked()
  await expect(checkbox2).toBeChecked()
  await expect(checkbox3).not.toBeChecked()
  await userEvent.tab()
  await expect(checkbox1).not.toHaveFocus()
  await expect(checkbox2).not.toHaveFocus()
  await expect(checkbox3).toHaveFocus()
  await userEvent.keyboard("[Space]")
  await expect(checkbox1).toBeChecked()
  await expect(checkbox2).toBeChecked()
  await expect(checkbox3).toBeChecked()
  await userEvent.tab({ shift: true })
  await expect(checkbox1).not.toHaveFocus()
  await expect(checkbox2).toHaveFocus()
  await expect(checkbox3).not.toHaveFocus()
  await userEvent.keyboard("[Space]")
  await expect(checkbox1).toBeChecked()
  await expect(checkbox2).not.toBeChecked()
  await expect(checkbox3).toBeChecked()
}
