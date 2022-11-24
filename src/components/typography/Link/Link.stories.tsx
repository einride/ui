import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { Link } from "./Link"

export default {
  title: "Typography/Link",
  component: Link,
} as ComponentMeta<typeof Link>

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />

export const Basic = Template.bind({})
Basic.args = {
  as: "a",
  children: "A whole new way to ship.",
  href: "https://einride.tech",
}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const link = canvas.getByRole("link", { name: "A whole new way to ship." })
  await expect(link).not.toBeDisabled()
}
