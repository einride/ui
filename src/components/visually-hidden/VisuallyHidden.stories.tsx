import { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "@storybook/test"
import { PrimaryButton } from "../controls/buttons/PrimaryButton/PrimaryButton"
import { VisuallyHidden } from "./VisuallyHidden"

const meta = {
  component: VisuallyHidden,
} satisfies Meta<typeof VisuallyHidden>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  render: (args) => (
    <PrimaryButton>
      Update
      <VisuallyHidden {...args} />
    </PrimaryButton>
  ),
  args: {
    children: <>user with name Filip</>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    await expect(button).toHaveAccessibleName(/update user with name filip/i)
  },
} satisfies Story
