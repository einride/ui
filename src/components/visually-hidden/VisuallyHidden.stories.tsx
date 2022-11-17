import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { PrimaryButton } from "../controls/buttons/PrimaryButton/PrimaryButton"
import { VisuallyHidden } from "./VisuallyHidden"

export default {
  title: "VisuallyHidden/VisuallyHidden",
  component: VisuallyHidden,
} as ComponentMeta<typeof VisuallyHidden>

export const Basic: ComponentStory<typeof VisuallyHidden> = (): JSX.Element => {
  return (
    <PrimaryButton>
      Update
      <VisuallyHidden>user with name Filip</VisuallyHidden>
    </PrimaryButton>
  )
}

Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole("button")
  await expect(button).toHaveAccessibleName(/update user with name filip/i)
}
