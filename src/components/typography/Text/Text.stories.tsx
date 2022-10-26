import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Text } from "./Text"

export default {
  title: "Typography/Text",
  component: Text,
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />

export const Default = Template.bind({})
Default.args = {
  children:
    "A whole new way to ship. Designed for the majority of freight applications, starting today.",
}

export const TitleXl = Template.bind({})
TitleXl.args = {
  ...Default.args,
  as: "h2",
  variant: "title-xl",
}

export const Secondary = Template.bind({})
Secondary.args = {
  ...Default.args,
  as: "h2",
  color: "secondary",
}
