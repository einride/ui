import { Story } from "@storybook/react/types-6-0"
import * as React from "react"
import { IconButton, IconButtonProps } from "./IconButton"

export default {
  title: "Controls/Buttons/IconButton",
  component: IconButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=122%3A125",
    },
  },
}

const Template: Story<IconButtonProps> = (args) => <IconButton {...args} />

export const Default = Template.bind({})
Default.args = {}
