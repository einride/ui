import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { Text } from "./Text"

export default {
  title: "Typography/Text",
  component: Text,
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children:
    "A whole new way to ship. Designed for the majority of freight applications, starting today.",
}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const text = canvas.getByText(
    "A whole new way to ship. Designed for the majority of freight applications, starting today.",
  )
  await expect(text).toBeInTheDocument()
}

export const TitleXl = Template.bind({})
TitleXl.args = {
  ...Basic.args,
  variant: "titleXl",
}
TitleXl.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const text = canvas.getByRole("heading", {
    level: 2,
    name: "A whole new way to ship. Designed for the majority of freight applications, starting today.",
  })
  await expect(text).toBeInTheDocument()
}

export const Secondary = Template.bind({})
Secondary.args = {
  ...Basic.args,
  color: "secondary",
}
Secondary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const text = canvas.getByText(
    "A whole new way to ship. Designed for the majority of freight applications, starting today.",
  )
  await expect(text).toBeInTheDocument()
}
