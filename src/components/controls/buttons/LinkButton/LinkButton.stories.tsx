import { ComponentMeta, ComponentStory } from "@storybook/react"
import { LinkButton } from "./LinkButton"

export default {
  title: "Controls/Buttons/LinkButton",
  component: LinkButton,
} as ComponentMeta<typeof LinkButton>

const Template: ComponentStory<typeof LinkButton> = (args) => <LinkButton {...args} />

export const Default = Template.bind({})
Default.args = {
  children: "Button",
}
