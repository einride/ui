import { Meta, StoryObj } from "@storybook/react"
import { expect, userEvent, within } from "@storybook/test"
import { ComponentProps, useState } from "react"
import { Slider } from "./Slider"

const meta = {
  component: Slider,
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
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
    ...Basic.args,
    defaultValue: [40],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const slider = canvas.getByRole("slider", { name: "Label" })
    await expect(slider).toHaveAttribute("aria-valuenow", "40")
  },
} satisfies Story

const ControlledTemplate = (args: ComponentProps<typeof Slider>): React.JSX.Element => {
  const [value, setValue] = useState([0])
  return <Slider {...args} value={value} onValueChange={setValue} />
}

export const Controlled = {
  render: (args) => <ControlledTemplate {...args} />,
  args: {
    ...Basic.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const slider = canvas.getByRole("slider", { name: "Label" })
    await expect(slider).toHaveAttribute("aria-valuenow", "0")
  },
} satisfies Story

export const Keyboard = {
  args: {
    ...Basic.args,
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
