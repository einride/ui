import { ComponentMeta, ComponentStory } from "@storybook/react"
import { HorizontalSpacing } from "./HorizontalSpacing"

export default {
  title: "Layout/HorizontalSpacing",
  component: HorizontalSpacing,
} as ComponentMeta<typeof HorizontalSpacing>

const Template: ComponentStory<typeof HorizontalSpacing> = (args) => <HorizontalSpacing {...args} />

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
