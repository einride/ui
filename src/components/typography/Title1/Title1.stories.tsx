import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Title1 } from "./Title1"

export default {
  title: "Typography/Title1",
  component: Title1,
} as ComponentMeta<typeof Title1>

const Template: ComponentStory<typeof Title1> = (args) => <Title1 {...args} />

export const Default = Template.bind({})
Default.args = {
  children:
    "A whole new way to ship. Designed for the majority of freight applications, starting today.",
}
