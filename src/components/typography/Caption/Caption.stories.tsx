import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Caption } from "./Caption"

export default {
  title: "Typography/Caption",
  component: Caption,
} as ComponentMeta<typeof Caption>

const Template: ComponentStory<typeof Caption> = (args) => <Caption {...args} />

export const Default = Template.bind({})
Default.args = {
  children:
    "A whole new way to ship. Designed for the majority of freight applications, starting today.",
}
