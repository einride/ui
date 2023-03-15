import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { PrimaryButton } from "../controls/buttons/PrimaryButton/PrimaryButton"
import { VisuallyHidden } from "./VisuallyHidden"

export default {
  title: "VisuallyHidden/VisuallyHidden",
  component: VisuallyHidden,
} satisfies ComponentMeta<typeof VisuallyHidden>

type Story = ComponentStoryObj<typeof VisuallyHidden>

export const Basic = {
  render: () => (
    <PrimaryButton>
      Update
      <VisuallyHidden>user with name Filip</VisuallyHidden>
    </PrimaryButton>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole("button")
    await expect(button).toHaveAccessibleName(/update user with name filip/i)
  },
} satisfies Story
