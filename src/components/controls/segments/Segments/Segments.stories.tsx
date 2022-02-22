import { Story } from "@storybook/react/types-6-0"
import { Paragraph } from "../../../typography/Paragraph/Paragraph"
import { Segments, SegmentsProps } from "./Segments"

export default {
  title: "Controls/Segments/Segments",
  component: Segments,
  argTypes: {},
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
      content: <Paragraph>First segment content.</Paragraph>,
    },
    {
      id: "segment-2",
      text: "Second Segment",
      content: <Paragraph>Second segment content.</Paragraph>,
    },
    {
      id: "segment-3",
      text: "Third segment",
      content: <Paragraph>Third segment content.</Paragraph>,
    },
  ],
}
