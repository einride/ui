import { Meta, StoryObj } from "@storybook/react"
import { SnapshotWrapper } from "../../../lib/storybook/SnapshotWrapper"
import { LinearProgress } from "./LinearProgress"

const meta = {
  title: "Charts/LinearProgress",
  component: LinearProgress,
} satisfies Meta<typeof LinearProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {
    "aria-label": "Progress",
    value: 50,
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Default].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <LinearProgress key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies StoryObj
