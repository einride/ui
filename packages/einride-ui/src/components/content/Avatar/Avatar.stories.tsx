import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { SnapshotWrapper } from "../../../lib/storybook/SnapshotWrapper"
import { borderRadii, contentColors } from "../../../lib/theme/types"
import { Avatar } from "./Avatar"
import { getInitials } from "./getInitials"

const meta = {
  component: Avatar,
  argTypes: {
    as: {
      control: false,
    },
    color: {
      control: {
        type: "select",
      },
      options: contentColors,
    },
    background: {
      control: {
        type: "select",
      },
      options: contentColors,
    },
    radius: {
      control: {
        type: "select",
      },
      options: borderRadii,
    },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    alt: "Astronaut walking on the moon",
    src: "https://source.unsplash.com/e5eDHbmHprg/250x250",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const avatar = canvas.getByRole("img", { name: Basic.args.alt })
    expect(avatar).toBeInTheDocument()
  },
} satisfies Story

/** Control the shape of the avatar with the `radius` prop. */
export const Square = {
  args: {
    ...Basic.args,
    radius: "sm",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const avatar = canvas.getByRole("img", { name: Square.args.alt })
    expect(avatar).toBeInTheDocument()
  },
} satisfies Story

/** Control the size of the avatar with the `size` prop. */
export const Small = {
  args: {
    ...Basic.args,
    size: "sm",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const avatar = canvas.getByRole("img", { name: Small.args.alt })
    expect(avatar).toBeInTheDocument()
  },
} satisfies Story

/** Instead of an image you can also show initials by passing a `name`. */
export const Initials = {
  args: {
    name: "Filip Tammergård",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const initials = canvas.getByText(getInitials(Initials.args.name) ?? "")
    expect(initials).toBeInTheDocument()
  },
} satisfies Story

/** Customize the colors with the `color` and `background` props. */
export const CustomColors = {
  args: {
    name: "Filip Tammergård",
    color: "primaryInverted",
    background: "primaryInverted",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const initials = canvas.getByText(getInitials(Initials.args.name) ?? "")
    expect(initials).toBeInTheDocument()
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Basic, Square, Initials].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Avatar key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies StoryObj
