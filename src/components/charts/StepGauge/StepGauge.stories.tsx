import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { StepGauge } from "./StepGauge"

export default {
  title: "Charts/StepGauge",
  component: StepGauge,
} satisfies ComponentMeta<typeof StepGauge>

type Story = ComponentStoryObj<typeof StepGauge>

export const Default = {
  args: {
    "aria-label": "Progress",
    completedSteps: 2,
  },
} satisfies Story
