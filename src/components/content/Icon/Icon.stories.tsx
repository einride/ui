import { Story } from "@storybook/react/types-6-0"
import * as React from "react"
import { Icon, IconProps } from "./Icon"

export default {
  title: "Content/Icon",
  component: Icon,
  argTypes: {},
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/UI-Components?node-id=79%3A0",
    },
  },
}

const Template: Story<IconProps> = (args) => <Icon {...args} />

export const Checkmark = Template.bind({})
Checkmark.args = {
  name: "checkmark",
}

export const Warning = Template.bind({})
Warning.args = {
  name: "warning",
}

export const ChecronDowm = Template.bind({})
ChecronDowm.args = {
  name: "chevronDown",
}
