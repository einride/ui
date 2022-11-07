import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Title2 } from "./Title2"

export default {
  title: "Typography/Title2",
  component: Title2,
} as ComponentMeta<typeof Title2>

const Template: ComponentStory<typeof Title2> = (args) => <Title2 {...args} />

export const Default = Template.bind({})
Default.args = {
  children:
    "A whole new way to ship. Designed for the majority of freight applications, starting today.",
}
