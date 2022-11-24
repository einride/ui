import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { LinkButton } from "./LinkButton"

export default {
  title: "Controls/Buttons/LinkButton",
  component: LinkButton,
} as ComponentMeta<typeof LinkButton>

const Template: ComponentStory<typeof LinkButton> = (args) => <LinkButton {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: "Button",
}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const button = canvas.getByRole("button", { name: "Button" })
  await expect(button).not.toBeDisabled()
}
