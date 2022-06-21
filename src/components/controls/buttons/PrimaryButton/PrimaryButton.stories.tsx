import { Story } from "@storybook/react/types-6-0"
import { Icon } from "../../../content/Icon/Icon"
import { PrimaryButton, PrimaryButtonProps } from "./PrimaryButton"

export default {
  title: "Controls/Buttons/PrimaryButton",
  component: PrimaryButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
}

const Template: Story<PrimaryButtonProps> = (args) => <PrimaryButton {...args} />

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
