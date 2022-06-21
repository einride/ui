import { Story } from "@storybook/react/types-6-0"
import { WithIconButton, WithIconButtonProps } from "./WithIconButton"

export default {
  title: "Controls/Buttons/WithIconButton",
  component: WithIconButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
}

const Template: Story<WithIconButtonProps> = (args) => <WithIconButton {...args} />

export const Default = Template.bind({})
Default.args = {
  children: "Button",
}
