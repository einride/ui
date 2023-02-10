import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { StepProgress } from "./StepProgress"

export default {
  title: "Charts/StepProgress",
  component: StepProgress,
} satisfies ComponentMeta<typeof StepProgress>

type Story = ComponentStoryObj<typeof StepProgress>

export const Default = {
  args: {
    completedSteps: 2,
    title: "Electrification potential",
  },
} satisfies Story
