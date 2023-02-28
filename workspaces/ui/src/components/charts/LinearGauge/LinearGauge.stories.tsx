import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { SnapshotWrapper } from "../../../lib/storybook/SnapshotWrapper"
import { LinearGauge } from "./LinearGauge"

export default {
  title: "Charts/LinearGauge",
  component: LinearGauge,
} satisfies ComponentMeta<typeof LinearGauge>

type Story = ComponentStoryObj<typeof LinearGauge>

export const Default = {
  args: {
    "aria-label": "Progress",
    value: 40,
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Default].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <LinearGauge key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Story
