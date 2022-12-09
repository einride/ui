import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { useState } from "react"
import { Radio } from "./Radio"

export default {
  title: "Controls/Radios/Radio",
  component: Radio,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof Radio>

const Template: ComponentStory<typeof Radio> = (args) => <Radio {...args} />

export const WithLabel = Template.bind({})
WithLabel.args = {
  children: "Label",
}
WithLabel.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const radio = canvas.getByRole("radio", { name: "Label" })
  await expect(radio).not.toBeChecked()
}

export const DefaultChecked = Template.bind({})
DefaultChecked.args = {
  ...WithLabel.args,
  defaultChecked: true,
}
DefaultChecked.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const radio = canvas.getByRole("radio", { name: "Label" })
  await expect(radio).toBeChecked()
}

const ControlledTemplate: ComponentStory<typeof Radio> = (args) => {
  const [checked, setChecked] = useState(false)
  return <Radio {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  ...WithLabel.args,
}
Controlled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const radio = canvas.getByRole("radio", { name: "Label" })
  await expect(radio).not.toBeChecked()
}

export const Mouse = Template.bind({})
Mouse.args = {
  ...WithLabel.args,
}
Mouse.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const radio = canvas.getByRole("radio", { name: "Label" })
  await expect(radio).not.toHaveFocus()
  await expect(radio).not.toBeChecked()
  await userEvent.click(radio)
  await expect(radio).toHaveFocus()
  await expect(radio).toBeChecked()
}

export const Keyboard = Template.bind({})
Keyboard.args = {
  ...WithLabel.args,
}
Keyboard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const radio = canvas.getByRole("radio", { name: "Label" })
  await expect(radio).not.toHaveFocus()
  await expect(radio).not.toBeChecked()
  await userEvent.tab()
  await expect(radio).toHaveFocus()
  await userEvent.keyboard("[Space]")
  await expect(radio).toBeChecked()
}

const GroupTemplate: ComponentStory<typeof Radio> = () => {
  return (
    <>
      <Radio name="name">Label 1</Radio>
      <Radio name="name">Label 2</Radio>
      <Radio name="name">Label 3</Radio>
    </>
  )
}

export const GroupMouse = GroupTemplate.bind({})
GroupMouse.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const radio1 = canvas.getByRole("radio", { name: "Label 1" })
  const radio2 = canvas.getByRole("radio", { name: "Label 2" })
  const radio3 = canvas.getByRole("radio", { name: "Label 3" })
  await expect(radio1).not.toBeChecked()
  await expect(radio2).not.toBeChecked()
  await expect(radio3).not.toBeChecked()
  await userEvent.click(radio1)
  await expect(radio1).toBeChecked()
  await expect(radio2).not.toBeChecked()
  await expect(radio3).not.toBeChecked()
  await userEvent.click(radio2)
  await expect(radio1).not.toBeChecked()
  await expect(radio2).toBeChecked()
  await expect(radio3).not.toBeChecked()
  await userEvent.click(radio3)
  await expect(radio1).not.toBeChecked()
  await expect(radio2).not.toBeChecked()
  await expect(radio3).toBeChecked()
  await userEvent.click(radio3) // ensure you can't uncheck radio button by clicking again
  await expect(radio1).not.toBeChecked()
  await expect(radio2).not.toBeChecked()
  await expect(radio3).toBeChecked()
}

export const GroupKeyboard = GroupTemplate.bind({})
GroupKeyboard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const radio1 = canvas.getByRole("radio", { name: "Label 1" })
  const radio2 = canvas.getByRole("radio", { name: "Label 2" })
  const radio3 = canvas.getByRole("radio", { name: "Label 3" })
  await userEvent.tab()
  await expect(radio1).toHaveFocus()
  await expect(radio1).not.toBeChecked()
  await expect(radio2).not.toBeChecked()
  await expect(radio3).not.toBeChecked()
  await userEvent.keyboard("[Space]")
  await expect(radio1).toBeChecked()
  await expect(radio2).not.toBeChecked()
  await expect(radio3).not.toBeChecked()
  await userEvent.keyboard("[ArrowDown]")
  await expect(radio1).not.toBeChecked()
  await expect(radio2).toBeChecked()
  await expect(radio3).not.toBeChecked()
  await userEvent.keyboard("[ArrowUp]")
  await userEvent.keyboard("[ArrowUp]") // ensure radio focus loops
  await expect(radio1).not.toBeChecked()
  await expect(radio2).not.toBeChecked()
  await expect(radio3).toBeChecked()
  await userEvent.keyboard("[ArrowDown]")
  await expect(radio1).toBeChecked()
  await expect(radio2).not.toBeChecked()
  await expect(radio3).not.toBeChecked()
}
