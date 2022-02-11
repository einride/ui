import { Story } from "@storybook/react/types-6-0"
import { Segments, SegmentsProps } from "./Segments"

export default {
  title: "Controls/Segments/Segments",
  component: Segments,
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

const Template: Story<SegmentsProps> = (args) => <Segments {...args} />

export const Default = Template.bind({})
Default.args = {
  segments: [
    {
      id: "segment-1",
      text: "First Segment",
      content: <div>First segment content.</div>,
    },
    {
      id: "segment-2",
      text: "Second Segment",
      content: <div>Second segment content.</div>,
    },
  ],
}
