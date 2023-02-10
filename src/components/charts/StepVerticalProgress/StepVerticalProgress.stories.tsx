import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { SnapshotWrapper } from "../../../lib/storybook/SnapshotWrapper"
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

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Default].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <StepVerticalProgress key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Story
