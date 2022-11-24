import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { TertiaryButton } from "./TertiaryButton"

export default {
  title: "Controls/Buttons/TertiaryButton",
  component: TertiaryButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof TertiaryButton>

const Template: ComponentStory<typeof TertiaryButton> = (args) => <TertiaryButton {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: "Button",
}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole("button", { name: "Button" })
  await expect(button).not.toBeDisabled()
}

export const IsLoading = Template.bind({})
IsLoading.args = {
  ...Basic.args,
  isLoading: true,
}
IsLoading.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole("button", { name: "Button" })
  await expect(button).not.toBeDisabled()
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Basic.args,
  disabled: true,
}
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole("button", { name: "Button" })
  await expect(button).toBeDisabled()
}
