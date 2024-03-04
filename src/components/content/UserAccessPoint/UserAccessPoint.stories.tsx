import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { SnapshotWrapper } from "../../../lib/storybook/SnapshotWrapper"
import { UserAccessPoint } from "./UserAccessPoint"

const meta = {
  component: UserAccessPoint,
  argTypes: {
    as: {
      control: false,
    },
  },
} satisfies Meta<typeof UserAccessPoint>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    avatarImageSrc: "https://avatars.githubusercontent.com/u/44197016?v=4",
    status: "default",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "User profile picture" })
    await expect(button).toBeInTheDocument()
  },
} satisfies Story

/** Control the status of the user access point with the `status` prop. */
export const NoUser = {
  args: {
    avatarImageSrc: "https://avatars.githubusercontent.com/u/44197016?v=4",
    status: "no-user",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Einride logo" })
    await expect(button).toBeInTheDocument()
  },
} satisfies Story

export const Notification = {
  args: {
    avatarImageSrc: "https://avatars.githubusercontent.com/u/44197016?v=4",
    status: "notification",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "User profile picture" })
    await expect(button).toBeInTheDocument()
  },
} satisfies Story

/** Passing a `name` instead of `avatarImageSrc` will include initials instead of an image in the user access point. */
export const Initials = {
  args: {
    name: "Filip Tammergård",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Filip Tammergård" })
    await expect(button).toBeInTheDocument()
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Basic, NoUser, Notification, Initials].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <UserAccessPoint key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies StoryObj
