import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { SnapshotWrapper } from "../../../lib/storybook/SnapshotWrapper"
import { Banner } from "./Banner"

const meta = {
  component: Banner,
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof Banner>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    title: "Title",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const title = canvas.getByText(Basic.args.title)
    expect(title).toBeInTheDocument()
  },
} satisfies Story

export const Success = {
  args: {
    ...Basic.args,
    status: "success",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const title = canvas.getByText(Success.args.title)
    expect(title).toBeInTheDocument()
  },
} satisfies Story

/** Control the status of the banner with the `status` prop. */
export const Warning = {
  args: {
    ...Basic.args,
    status: "warning",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const title = canvas.getByText(Warning.args.title)
    expect(title).toBeInTheDocument()
  },
} satisfies Story

export const Fail = {
  args: {
    ...Basic.args,
    status: "fail",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const title = canvas.getByText(Fail.args.title)
    expect(title).toBeInTheDocument()
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Basic, Success, Warning, Fail].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Banner key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies StoryObj
