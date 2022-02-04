import { Story } from "@storybook/react/types-6-0"
import * as React from "react"
import { Logo, LogoProps } from "./Logo"

export default {
  title: "Content/Logo",
  component: Logo,
  argTypes: {},
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=84%3A98",
    },
  },
}

const Template: Story<LogoProps> = (args) => <Logo {...args} />

export const Default = Template.bind({})
Default.args = {}

export const DefaultSmall = Template.bind({})
DefaultSmall.args = {
  size: "small",
  variant: "default",
}

export const DefaultLarge = Template.bind({})
DefaultLarge.args = {
  size: "large",
  variant: "default",
}

export const InverseSmall = Template.bind({})
InverseSmall.args = {
  size: "small",
  variant: "inverse",
}

export const InverseLarge = Template.bind({})
InverseLarge.args = {
  size: "large",
  variant: "inverse",
}
