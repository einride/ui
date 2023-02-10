import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { SnapshotWrapper } from "../../../lib/storybook/SnapshotWrapper"
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

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Default].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <LinearVerticalProgress key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Story
