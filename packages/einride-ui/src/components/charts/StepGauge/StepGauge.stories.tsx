import { Meta, StoryObj } from "@storybook/react"
import { SnapshotWrapper } from "../../../lib/storybook/SnapshotWrapper"
import { StepGauge } from "./StepGauge"

const meta = {
  component: StepGauge,
} satisfies Meta<typeof StepGauge>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {
    "aria-label": "Progress",
    completedSteps: 2,
    steps: 3, // TODO: Make prop optional?
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Default].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <StepGauge key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies StoryObj
