import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { ComponentProps } from "react"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { Icon } from "../../../content/Icon/Icon"
import { TertiaryButton } from "./TertiaryButton"

export default {
  title: "Controls/Buttons/TertiaryButton",
  component: TertiaryButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} satisfies ComponentMeta<typeof TertiaryButton>

type Story = ComponentStoryObj<typeof TertiaryButton>

export const Basic = {
  args: {
    children: "Button",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Button" })
    await expect(button).not.toBeDisabled()
  },
} satisfies Story

export const FullWidth = {
  args: {
    ...Basic.args,
    isFullWidth: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Button" })
    await expect(button).not.toBeDisabled()
  },
} satisfies Story

export const IconRight = {
  args: {
    ...Basic.args,
    rightIcon: <Icon name="arrowRight" />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Button" })
    await expect(button).not.toBeDisabled()
  },
} satisfies Story

export const IsLoading = {
  args: {
    ...Basic.args,
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button", { name: "Button" })
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
    const button = canvas.getByRole("button", { name: "Button" })
    await expect(button).toBeDisabled()
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Basic, FullWidth, IconRight, Disabled].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <TertiaryButton key={index} {...(Story.args as ComponentProps<typeof TertiaryButton>)} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Story
