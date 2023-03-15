import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { SnapshotWrapper } from "../../../lib/storybook/SnapshotWrapper"
import { Logo } from "./Logo"

export default {
  title: "Content/Logo",
  component: Logo,
} satisfies ComponentMeta<typeof Logo>

type Story = ComponentStoryObj<typeof Logo>

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
} satisfies Story
