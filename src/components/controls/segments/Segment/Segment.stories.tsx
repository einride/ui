import { Story } from "@storybook/react/types-6-0"
import { Segment, SegmentProps } from "./Segment"

export default {
  title: "Controls/Segments/Segment",
  component: Segment,
  argTypes: {
    disabled: {
      control: "boolean",
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "",
    },
  },
}

const Template: Story<SegmentProps> = (args) => <Segment {...args} />

export const Unselected = Template.bind({})
Unselected.args = {
  children: "Segment",
}

export const Selected = Template.bind({})
Selected.args = {
  children: "Segment",
  selected: true,
}
