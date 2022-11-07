import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Paragraph } from "./Paragraph"

export default {
  title: "Typography/Paragraph",
  component: Paragraph,
} as ComponentMeta<typeof Paragraph>

const Template: ComponentStory<typeof Paragraph> = (args) => <Paragraph {...args} />

export const Default = Template.bind({})
Default.args = {
  children:
    "A whole new way to ship. Designed for the majority of freight applications, starting today.",
}
