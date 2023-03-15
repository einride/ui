import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory, ComponentStoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { useState } from "react"
import { Slider } from "./Slider"

export default {
  title: "Controls/Sliders/Slider",
  component: Slider,
} satisfies ComponentMeta<typeof Slider>

type Story = ComponentStoryObj<typeof Slider>

export const WithLabel = {
  args: {
    label: "Label",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const slider = canvas.getByRole("slider", { name: "Label" })
    await expect(slider).toHaveAttribute("aria-valuenow", "0")
  },
} satisfies Story

export const WithoutLabel = {
  args: {
    "aria-label": "Label",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const slider = canvas.getByRole("slider", { name: "Label" })
    await expect(slider).toHaveAttribute("aria-valuenow", "0")
  },
} satisfies Story

export const DefaultValue = {
  args: {
    ...WithLabel.args,
    defaultValue: [40],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const slider = canvas.getByRole("slider", { name: "Label" })
    await expect(slider).toHaveAttribute("aria-valuenow", "40")
  },
} satisfies Story

const ControlledTemplate: ComponentStory<typeof Slider> = (args) => {
  const [value, setValue] = useState([0])
  return <Slider {...args} value={value} onValueChange={setValue} />
}

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...WithLabel.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const slider = canvas.getByRole("slider", { name: "Label" })
    await expect(slider).toHaveAttribute("aria-valuenow", "0")
  },
} satisfies Story

export const Keyboard = {
  args: {
    ...WithLabel.args,
  },
  play: async ({ canvasElement }) => {
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
  },
} satisfies Story
