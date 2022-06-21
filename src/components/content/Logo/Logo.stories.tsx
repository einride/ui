import { Story } from "@storybook/react/types-6-0"
import { Logo, LogoProps } from "./Logo"

export default {
  title: "Content/Logo",
  component: Logo,
}

const Template: Story<LogoProps> = (args) => <Logo {...args} />

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
