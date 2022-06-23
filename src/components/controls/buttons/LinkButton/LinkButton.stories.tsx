import { Story } from "@storybook/react/types-6-0"
import { LinkButton, LinkButtonProps } from "./LinkButton"

export default {
  title: "Controls/Buttons/LinkButton",
  component: LinkButton,
}

const Template: Story<LinkButtonProps> = (args) => <LinkButton {...args} />

export const Default = Template.bind({})
Default.args = {
  children: "Button",
}
