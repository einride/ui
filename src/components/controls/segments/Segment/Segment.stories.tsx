import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Segment } from "./Segment"

export default {
  title: "Controls/Segments/Segment",
  component: Segment,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
} as ComponentMeta<typeof Segment>

const Template: ComponentStory<typeof Segment> = (args) => <Segment {...args} />

export const Unselected = Template.bind({})
Unselected.args = {
  children: "Segment",
}

export const Selected = Template.bind({})
Selected.args = {
  children: "Segment",
  selected: true,
}
