import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { StepVerticalProgress } from "./StepVerticalProgress"

export default {
  title: "Charts/StepVerticalProgress",
  component: StepVerticalProgress,
} satisfies ComponentMeta<typeof StepVerticalProgress>

type Story = ComponentStoryObj<typeof StepVerticalProgress>

export const Default = {
  args: {
    "aria-label": "Deliveries completed",
    completedSteps: 2,
  },
} satisfies Story
