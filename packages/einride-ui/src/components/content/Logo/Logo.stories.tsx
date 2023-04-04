import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { SnapshotWrapper } from "../../../lib/storybook/SnapshotWrapper"
import { Logo } from "./Logo"

const meta = {
  component: Logo,
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const logo = canvas.getByRole("img")
    await expect(logo).toHaveAccessibleName(/einride/i)
  },
} satisfies Story

export const Small = {
  args: {
    size: "sm",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const logo = canvas.getByRole("img")
    await expect(logo).toHaveAccessibleName(/einride/i)
  },
} satisfies Story

/** It's possible to make the logo larger. */
export const Large = {
  args: {
    size: "lg",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const logo = canvas.getByRole("img")
    await expect(logo).toHaveAccessibleName(/einride/i)
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Basic, Small, Large].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Logo key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies StoryObj
