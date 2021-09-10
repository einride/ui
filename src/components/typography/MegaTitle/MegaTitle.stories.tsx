import { Story } from "@storybook/react/types-6-0"
import { MegaTitle, MegaTitleProps } from "./MegaTitle"

export default {
  title: "Typography/MegaTitle",
  component: MegaTitle,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/Components-v1.0?node-id=18%3A143",
    },
  },
}

const Template: Story<MegaTitleProps> = (args) => <MegaTitle {...args} />

export const Default = Template.bind({})
Default.args = {
  children: "A whole new way to ship.",
}
