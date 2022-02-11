import { Story } from "@storybook/react/types-6-0"
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

export const ChevronDowm = Template.bind({})
ChevronDowm.args = {
  name: "chevronDown",
}

export const ChevronUp = Template.bind({})
ChevronUp.args = {
  name: "chevronUp",
}

export const ChevronRight = Template.bind({})
ChevronRight.args = {
  name: "chevronRight",
}

export const ChevronLeft = Template.bind({})
ChevronLeft.args = {
  name: "chevronLeft",
}

export const XMark = Template.bind({})
XMark.args = {
  name: "xMark",
}

export const ArrowUp = Template.bind({})
ArrowUp.args = {
  name: "arrowUp",
}

export const ArrowDown = Template.bind({})
ArrowDown.args = {
  name: "arrowDown",
}

export const ArrowRight = Template.bind({})
ArrowRight.args = {
  name: "arrowRight",
}

export const ArrowLeft = Template.bind({})
ArrowLeft.args = {
  name: "arrowLeft",
}

export const ArrowUpCircle = Template.bind({})
ArrowUpCircle.args = {
  name: "arrowUpCircle",
}

export const ArrowDownCircle = Template.bind({})
ArrowDownCircle.args = {
  name: "arrowDownCircle",
}

export const Bolt = Template.bind({})
Bolt.args = {
  name: "bolt",
}

export const Loupe = Template.bind({})
Loupe.args = {
  name: "loupe",
}
