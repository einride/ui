import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { Icon } from "../../../content/Icon/Icon"
import { PrimaryButton } from "./PrimaryButton"

export default {
  title: "Controls/Buttons/PrimaryButton",
  component: PrimaryButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof PrimaryButton>

const Template: ComponentStory<typeof PrimaryButton> = (args) => <PrimaryButton {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: "Button",
}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole("button", { name: "Button" })
  await expect(button).not.toBeDisabled()
}

export const FullWidth = Template.bind({})
FullWidth.args = {
  ...Basic.args,
  isFullWidth: true,
}
FullWidth.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole("button", { name: "Button" })
  await expect(button).not.toBeDisabled()
}

export const IconRight = Template.bind({})
IconRight.args = {
  ...Basic.args,
  rightIcon: <Icon name="arrowRight" />,
}
IconRight.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole("button", { name: "Button" })
  await expect(button).not.toBeDisabled()
}

export const IsLoading = Template.bind({})
IsLoading.args = {
  ...Basic.args,
  isLoading: true,
}
IsLoading.parameters = {
  chromatic: { disableSnapshot: true },
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
