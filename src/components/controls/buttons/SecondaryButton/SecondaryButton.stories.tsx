import { Story } from "@storybook/react/types-6-0"
import { Icon } from "../../../content/Icon/Icon"
import { SecondaryButton, SecondaryButtonProps } from "./SecondaryButton"

export default {
  title: "Controls/Buttons/SecondaryButton",
  component: SecondaryButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
}

const Template: Story<SecondaryButtonProps> = (args) => <SecondaryButton {...args} />

export const Default = Template.bind({})
Default.args = {
  children: "Button",
}

export const IconRight = Template.bind({})
IconRight.args = {
  ...Default.args,
  rightIcon: <Icon name="arrowRight" />,
}

export const IsLoading = Template.bind({})
IsLoading.args = {
  ...Default.args,
  isLoading: true,
}
