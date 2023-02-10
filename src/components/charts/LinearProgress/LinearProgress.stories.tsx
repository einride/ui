import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { LinearProgress } from "./LinearProgress"

export default {
  title: "Charts/LinearProgress",
  component: LinearProgress,
} satisfies ComponentMeta<typeof LinearProgress>

type Story = ComponentStoryObj<typeof LinearProgress>

export const Default = {
  args: {
    "aria-label": "Progress",
    value: 50,
  },
} satisfies Story
