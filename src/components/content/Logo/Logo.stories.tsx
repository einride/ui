import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Logo } from "./Logo"

export default {
  title: "Content/Logo",
  component: Logo,
} as ComponentMeta<typeof Logo>

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />

export const Default = Template.bind({})
Default.args = {}

export const Small = Template.bind({})
Small.args = {
  size: "sm",
}

export const Large = Template.bind({})
Large.args = {
  size: "lg",
}
