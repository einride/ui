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

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: "Label",
}
WithLabel.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const slider = canvas.getByRole("slider", { name: "Label" })
  await expect(slider).toHaveAttribute("aria-valuenow", "0")
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  "aria-label": "Label",
}
WithoutLabel.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const slider = canvas.getByRole("slider", { name: "Label" })
  await expect(slider).toHaveAttribute("aria-valuenow", "0")
}

export const DefaultValue = Template.bind({})
DefaultValue.args = {
  ...WithLabel.args,
  defaultValue: [40],
}
DefaultValue.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const slider = canvas.getByRole("slider", { name: "Label" })
  await expect(slider).toHaveAttribute("aria-valuenow", "40")
}

const ControlledTemplate: ComponentStory<typeof Slider> = (args) => {
  const [value, setValue] = useState([0])
  return <Slider {...args} value={value} onValueChange={setValue} />
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  ...WithLabel.args,
}
Controlled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const slider = canvas.getByRole("slider", { name: "Label" })
  await expect(slider).toHaveAttribute("aria-valuenow", "0")
}

export const Keyboard = Template.bind({})
Keyboard.args = {
  ...WithLabel.args,
}
Keyboard.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const slider = canvas.getByRole("slider", { name: "Label" })
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
