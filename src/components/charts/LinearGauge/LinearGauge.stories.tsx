import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { LinearGauge } from "./LinearGauge"

export default {
  title: "Charts/LinearGauge",
  component: LinearGauge,
} satisfies ComponentMeta<typeof LinearGauge>

type Story = ComponentStoryObj<typeof LinearGauge>

export const Default = {
  args: {
    "aria-label": "Progress",
    value: 40,
  },
} satisfies Story
