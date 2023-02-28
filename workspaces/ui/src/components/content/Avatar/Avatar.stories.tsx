import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { SnapshotWrapper } from "../../../lib/storybook/SnapshotWrapper"
import { Avatar } from "./Avatar"

export default {
  title: "Content/Avatar",
  component: Avatar,
} satisfies ComponentMeta<typeof Avatar>

type Story = ComponentStoryObj<typeof Avatar>

export const Default = {
  args: {
    alt: "Profile picture",
    src: "https://source.unsplash.com/e5eDHbmHprg/250x250",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const avatar = canvas.getByAltText("Profile picture")
    expect(avatar).toBeInTheDocument()
  },
} satisfies Story

export const Circle = {
  args: {
    ...Default.args,
    radius: "full",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const avatar = canvas.getByAltText("Profile picture")
    expect(avatar).toBeInTheDocument()
  },
} satisfies Story

export const Square = {
  args: {
    ...Default.args,
    radius: "sm",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const avatar = canvas.getByAltText("Profile picture")
    expect(avatar).toBeInTheDocument()
  },
} satisfies Story

export const Initials = {
  args: {
    name: "Filip Tammergård",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const initials = canvas.getByText("FT")
    expect(initials).toBeInTheDocument()
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Default, Circle, Square, Initials].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Avatar key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Story
