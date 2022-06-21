import { Story } from "@storybook/react/types-6-0"
import { HorizontalSpacing, HorizontalSpacingProps } from "./HorizontalSpacing"

export default {
  title: "Layout/HorizontalSpacing",
  component: HorizontalSpacing,
}

const Template: Story<HorizontalSpacingProps> = (args) => <HorizontalSpacing {...args} />

export const Default = Template.bind({})
Default.args = {}

export const Small = Template.bind({})
Small.args = {
  size: "sm",
}

export const Large = Template.bind({})
Large.args = {
  size: "lg",
}
