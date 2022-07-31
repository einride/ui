import { Story } from "@storybook/react/types-6-0"
import { Icon } from "../../../content/Icon/Icon"
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

export const AddButton = Template.bind({})
AddButton.args = {
  "aria-label": "Add vehicle",
  icon: <Icon name="plus" />,
}
