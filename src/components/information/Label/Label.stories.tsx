import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Label } from "./Label"

export default {
  title: "Information/Label",
  component: Label,
} as ComponentMeta<typeof Label>

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />

export const Default = Template.bind({})
Default.args = {
  children: "Label",
}

export const Positive = Template.bind({})
Positive.args = {
  children: "Label",
  variant: "positive",
}

export const Negative = Template.bind({})
Negative.args = {
  children: "Label",
  variant: "negative",
}
