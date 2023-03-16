import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { IconButton } from "./IconButton"

const meta = {
  component: IconButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    "aria-label": "Label",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Label" })
    await expect(button).not.toBeDisabled()
  },
} satisfies Story

export const EllipsisButton = {
  args: {
    "aria-label": "Open menu",
    icon: "ellipsis",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Open menu" })
    await expect(button).not.toBeDisabled()
  },
} satisfies Story

export const Primary = {
  args: {
    ...Basic.args,
    variant: "primary",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Label" })
    await expect(button).not.toBeDisabled()
  },
} satisfies Story

export const Tertiary = {
  args: {
    ...Basic.args,
    variant: "tertiary",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Label" })
    await expect(button).not.toBeDisabled()
  },
} satisfies Story

export const Disabled = {
  args: {
    ...Basic.args,
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Label" })
    await expect(button).toBeDisabled()
  },
} satisfies Story

export const Snapshot = {
  argTypes: {
    disabled: {
      control: false,
    },
  },
  render: () => (
    <SnapshotWrapper>
      {[Basic, EllipsisButton, Primary, Tertiary, Disabled].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <IconButton key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies StoryObj
