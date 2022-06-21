import { Story } from "@storybook/react/types-6-0"
import { IconButton, IconButtonProps } from "./IconButton"

export default {
  title: "Controls/Buttons/IconButton",
  component: IconButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
}

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />

export const Default = Template.bind({})
Default.args = {}
