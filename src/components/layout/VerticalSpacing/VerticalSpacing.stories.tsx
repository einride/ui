import { Story } from "@storybook/react/types-6-0"
import { VerticalSpacing, VerticalSpacingProps } from "./VerticalSpacing"

export default {
  title: "Layout/VerticalSpacing",
  component: VerticalSpacing,
}

const Template: Story<VerticalSpacingProps> = (args) => <VerticalSpacing {...args} />

export const Default = Template.bind({})
Default.args = {}

export const ExtraSmall = Template.bind({})
ExtraSmall.args = {
  size: "xs",
}

export const Small = Template.bind({})
Small.args = {
  size: "sm",
}

export const Medium = Template.bind({})
Medium.args = {
  size: "md",
}

export const Large = Template.bind({})
Large.args = {
  size: "lg",
}

export const ExtraLarge = Template.bind({})
ExtraLarge.args = {
  size: "xl",
}
