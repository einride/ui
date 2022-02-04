import { Story } from "@storybook/react/types-6-0"
import * as React from "react"
import { SecondaryButton, SecondaryButtonProps } from "./SecondaryButton"

export default {
  title: "Controls/Buttons/SecondaryButton",
  component: SecondaryButton,
  argTypes: {
    disabled: {
      control: "boolean",
    },
    size: {
      options: ["small", "large"],
      control: { type: "radio" },
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=7%3A25",
    },
  },
}

const Template: Story<SecondaryButtonProps> = (args) => (
  <SecondaryButton {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: "Button",
}
