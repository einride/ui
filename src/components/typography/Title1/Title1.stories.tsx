import { Story } from "@storybook/react/types-6-0"
import * as React from "react"
import { Title1, Title1Props } from "./Title1"

export default {
  title: "Typography/Title1",
  component: Title1,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=18%3A144",
    },
  },
}

const Template: Story<Title1Props> = (args) => <Title1 {...args} />

export const Default = Template.bind({})
Default.args = {
  children:
    "A whole new way to ship. Designed for the majority of freight applications, starting today.",
}
