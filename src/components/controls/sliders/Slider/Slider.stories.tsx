import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { useState } from "react"
import { Slider } from "./Slider"

export default {
  title: "Controls/Sliders/Slider",
  component: Slider,
} as ComponentMeta<typeof Slider>

const Template: ComponentStory<typeof Slider> = (args) => <Slider {...args} />

export const Default = Template.bind({})
Default.args = {
  label: "Label",
  "aria-label": "Accessible name",
}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const slider = canvas.getByRole("slider")
  await expect(slider).toHaveAttribute("aria-valuenow", "0")
  const label = canvas.getByText("Label")
  await expect(label).toBeInTheDocument()
  await expect(slider).toHaveAccessibleName("Accessible name")
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  "aria-label": "Accessible name",
}
WithoutLabel.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const slider = canvas.getByRole("slider")
  await expect(slider).toHaveAccessibleName("Accessible name")
}

const ControlledTemplate: ComponentStory<typeof Slider> = (args) => {
  const [value, setValue] = useState([0])
  return <Slider {...args} value={value} onValueChange={setValue} />
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  ...Default.args,
}
Controlled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const slider = canvas.getByRole("slider")
  await expect(slider).toHaveAttribute("aria-valuenow", "0")
}

export const Keyboard = Template.bind({})
Keyboard.args = {
  ...Default.args,
}
Keyboard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const slider = canvas.getByRole("slider")
  await expect(slider).toHaveAttribute("aria-valuenow", "0")
  await userEvent.tab()
  await expect(slider).toHaveFocus()
  await userEvent.keyboard("[ArrowRight]")
  await userEvent.keyboard("[ArrowRight]")
  await userEvent.keyboard("[ArrowRight]")
  await userEvent.keyboard("[ArrowRight]")
  await userEvent.keyboard("[ArrowRight]")
  await expect(slider).toHaveAttribute("aria-valuenow", "5")
}
