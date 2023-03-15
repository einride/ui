import { Meta, StoryObj } from "@storybook/react"
import { SnapshotWrapper } from "../../../lib/storybook/SnapshotWrapper"
import { StepProgress } from "./StepProgress"

const meta = {
  title: "Charts/StepProgress",
  component: StepProgress,
} satisfies Meta<typeof StepProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {
    "aria-label": "Electrification potential", // TODO: Require only aria-label?
    completedSteps: 2,
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Default].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <StepProgress key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies StoryObj
