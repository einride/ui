import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { Icon } from "../../../content/Icon/Icon"
import { PrimaryButton } from "./PrimaryButton"

/** Button for primary actions. */
const meta = {
  component: PrimaryButton,
  argTypes: {
    as: {
      control: false,
    },
    rightIcon: {
      control: false,
    },
  },
} satisfies Meta<typeof PrimaryButton>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    children: "Button",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: Basic.args.children })
    await expect(button).not.toBeDisabled()
  },
} satisfies Story

/** Makes the button take available width. */
export const FullWidth = {
  args: {
    ...Basic.args,
    isFullWidth: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: FullWidth.args.children })
    await expect(button).not.toBeDisabled()
  },
} satisfies Story

/** Render an icon at the end of the button. */
export const IconRight = {
  args: {
    ...Basic.args,
    rightIcon: <Icon name="arrowRight" />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: IconRight.args.children })
    await expect(button).not.toBeDisabled()
  },
} satisfies Story

/** Indicates that something is loading. */
export const IsLoading = {
  args: {
    ...Basic.args,
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: IsLoading.args.children })
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
    const button = canvas.getByRole("button", { name: Disabled.args.children })
    await expect(button).toBeDisabled()
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Basic, FullWidth, IconRight, Disabled].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <PrimaryButton key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies StoryObj
