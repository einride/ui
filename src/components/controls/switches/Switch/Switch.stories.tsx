import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { useState } from "react"
import { Switch } from "./Switch"

export default {
  title: "Controls/Switches/Switch",
  component: Switch,
} as ComponentMeta<typeof Switch>

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />

export const Default = Template.bind({})
Default.args = {
  label: "Label",
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("switch")
  await expect(input).toHaveAccessibleName("Label")
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  "aria-label": "Label",
}
WithoutLabel.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("switch")
  await expect(input).toHaveAccessibleName("Label")
}

export const DefaultChecked = Template.bind({})
DefaultChecked.args = {
  ...Default.args,
  defaultChecked: true,
}
DefaultChecked.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("switch")
  await expect(input).toBeChecked()
}

const ControlledTemplate: ComponentStory<typeof Switch> = (args) => {
  const [checked, setChecked] = useState(false)
  return <Switch {...args} checked={checked} onCheckedChange={setChecked} />
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  ...Default.args,
}
Controlled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("switch")
  await expect(input).not.toBeChecked()
  await userEvent.click(input)
  await expect(input).toBeChecked()
  await userEvent.click(input)
  await expect(input).not.toBeChecked()
}

export const Mouse = Template.bind({})
Mouse.args = {
  ...Default.args,
}
Mouse.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("switch")
  await expect(input).not.toBeChecked()
  await userEvent.click(input)
  await expect(input).toBeChecked()
  await userEvent.click(input)
  await expect(input).not.toBeChecked()
}

export const Keyboard = Template.bind({})
Keyboard.args = {
  ...Default.args,
}
Keyboard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const input = canvas.getByRole("switch")
  await expect(input).not.toBeChecked()
  await expect(input).not.toHaveFocus()
  await userEvent.tab()
  await expect(input).not.toBeChecked()
  await expect(input).toHaveFocus()
  await userEvent.keyboard("[Enter]")
  await expect(input).toBeChecked()
  await userEvent.keyboard("[Space]")
  await expect(input).not.toBeChecked()
  await userEvent.tab()
  await expect(input).not.toHaveFocus()
}
