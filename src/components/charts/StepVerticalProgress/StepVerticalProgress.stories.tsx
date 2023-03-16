import { Meta, StoryObj } from "@storybook/react"
import { SnapshotWrapper } from "../../../lib/storybook/SnapshotWrapper"
import { StepVerticalProgress } from "./StepVerticalProgress"

const meta = {
  component: StepVerticalProgress,
} satisfies Meta<typeof StepVerticalProgress>

export default meta
type Story = StoryObj<typeof meta>

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
} satisfies StoryObj
