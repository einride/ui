import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { LinkButton } from "./LinkButton"

export default {
  title: "Controls/Buttons/LinkButton",
  component: LinkButton,
} satisfies ComponentMeta<typeof LinkButton>

type Story = ComponentStoryObj<typeof LinkButton>

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

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Basic].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <LinkButton key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Story
