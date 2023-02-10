import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { LinearVerticalProgress } from "./LinearVerticalProgress"

export default {
  title: "Charts/LinearVerticalProgress",
  component: LinearVerticalProgress,
} satisfies ComponentMeta<typeof LinearVerticalProgress>

type Story = ComponentStoryObj<typeof LinearVerticalProgress>

export const Default = {
  args: {
    "aria-label": "Progress",
    value: 50,
  },
} satisfies Story
