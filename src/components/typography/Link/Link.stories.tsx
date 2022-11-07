import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Link } from "./Link"

export default {
  title: "Typography/Link",
  component: Link,
} as ComponentMeta<typeof Link>

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />

export const Default = Template.bind({})
Default.args = {
  children: "A whole new way to ship.",
}
