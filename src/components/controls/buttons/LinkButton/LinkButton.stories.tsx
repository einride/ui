import { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "@storybook/test"
import { SnapshotWrapper } from "../../../../lib/storybook/SnapshotWrapper"
import { LinkButton } from "./LinkButton"

const meta = {
  component: LinkButton,
  argTypes: {
    as: {
      control: false,
    },
  },
} satisfies Meta<typeof LinkButton>

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
} satisfies StoryObj
