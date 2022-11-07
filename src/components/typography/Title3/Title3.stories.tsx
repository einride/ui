import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Title3 } from "./Title3"

export default {
  title: "Typography/Title3",
  component: Title3,
} as ComponentMeta<typeof Title3>

const Template: ComponentStory<typeof Title3> = (args) => <Title3 {...args} />

export const Default = Template.bind({})
Default.args = {
  children:
    "A whole new way to ship. Designed for the majority of freight applications, starting today.",
}
