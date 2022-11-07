import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Paragraph } from "../../../typography/Paragraph/Paragraph"
import { Segments } from "./Segments"

export default {
  title: "Controls/Segments/Segments",
  component: Segments,
} as ComponentMeta<typeof Segments>

const Template: ComponentStory<typeof Segments> = (args) => <Segments {...args} />

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
