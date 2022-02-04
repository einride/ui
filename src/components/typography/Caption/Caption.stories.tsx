import { Story } from "@storybook/react/types-6-0"
import * as React from "react"
import { Caption, CaptionProps } from "./Caption"

export default {
  title: "Typography/Caption",
  component: Caption,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=18%3A147",
    },
  },
}

const Template: Story<CaptionProps> = (args) => <Caption {...args} />

export const Default = Template.bind({})
Default.args = {
  children:
    "A whole new way to ship. Designed for the majority of freight applications, starting today.",
}
