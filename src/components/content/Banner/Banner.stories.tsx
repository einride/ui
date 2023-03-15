import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { SnapshotWrapper } from "../../../lib/storybook/SnapshotWrapper"
import { Banner } from "./Banner"

export default {
  title: "Content/Banner",
  component: Banner,
} satisfies ComponentMeta<typeof Banner>

type Story = ComponentStoryObj<typeof Banner>

export const Default = {
  args: {
    title: "Title",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const title = canvas.getByText("Title")
    expect(title).toBeInTheDocument()
  },
} satisfies Story

export const Success = {
  args: {
    ...Default.args,
    status: "success",
  },
} satisfies Story

export const Warning = {
  args: {
    ...Default.args,
    status: "warning",
  },
} satisfies Story

export const Fail = {
  args: {
    ...Default.args,
    status: "fail",
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Default, Success, Warning, Fail].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Banner key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Story
