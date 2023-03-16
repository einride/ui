import { Meta, StoryObj } from "@storybook/react"
import { SnapshotWrapper } from "../../../lib/storybook/SnapshotWrapper"
import { Logo } from "./Logo"

const meta = {
  component: Logo,
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {},
} satisfies Story

export const Small = {
  args: {
    size: "sm",
  },
} satisfies Story

export const Large = {
  args: {
    size: "lg",
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Default, Small, Large].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Logo key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies StoryObj
