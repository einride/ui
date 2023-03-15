import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { ComponentProps, useState } from "react"
import { Slider } from "./Slider"

const meta = {
  title: "Controls/Sliders/Slider",
  component: Slider,
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

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

const ControlledTemplate = (args: ComponentProps<typeof Slider>): JSX.Element => {
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
