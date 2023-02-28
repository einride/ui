import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { ComponentProps } from "react"
import { SnapshotWrapper } from "../../../lib/storybook/SnapshotWrapper"
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

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Default].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <StepGauge key={index} {...(Story.args as ComponentProps<typeof StepGauge>)} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Story
