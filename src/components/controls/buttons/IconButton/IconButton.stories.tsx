import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { IconButton } from "./IconButton"

export default {
  title: "Controls/Buttons/IconButton",
  component: IconButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof IconButton>

const Template: ComponentStory<typeof IconButton> = (args) => <IconButton {...args} />

export const Basic = Template.bind({})
Basic.args = {
  "aria-label": "Label",
}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole("button", { name: "Label" })
  await expect(button).not.toBeDisabled()
}

export const EllipsisButton = Template.bind({})
EllipsisButton.args = {
  "aria-label": "Open menu",
  icon: "ellipsis",
}
EllipsisButton.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole("button", { name: "Open menu" })
  await expect(button).not.toBeDisabled()
}

export const Primary = Template.bind({})
Primary.args = {
  ...Basic.args,
  variant: "primary",
}
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole("button", { name: "Label" })
  await expect(button).not.toBeDisabled()
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Basic.args,
  disabled: true,
}
Disabled.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole("button", { name: "Label" })
  await expect(button).toBeDisabled()
}
