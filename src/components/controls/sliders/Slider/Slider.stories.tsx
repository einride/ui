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
Default.args = {}
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const slider = canvas.getByRole("slider")
  await expect(slider).toHaveAttribute("aria-valuenow", "0")
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
  await userEvent.click(slider)
  await userEvent.keyboard("[ArrowRight]")
  await expect(slider).toHaveAttribute("aria-valuenow", "1")
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Default.args,
  defaultValue: [10],
  disabled: true,
}
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const slider = canvas.getByRole("slider")
  await expect(slider).toHaveAttribute("aria-valuenow", "10")
  await expect(slider).toHaveAttribute("data-disabled", "")
  await userEvent.click(slider)
  await userEvent.keyboard("[ArrowRight]")
  await expect(slider).toHaveAttribute("aria-valuenow", "10")
}
