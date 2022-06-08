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
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=7%3A23",
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
