import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { ComponentProps } from "react"
import { SnapshotWrapper } from "../../../lib/storybook/SnapshotWrapper"
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

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Default].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <StepProgress key={index} {...(Story.args as ComponentProps<typeof StepProgress>)} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Story
