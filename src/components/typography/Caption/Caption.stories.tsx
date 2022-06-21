import { Story } from "@storybook/react/types-6-0"
import { Caption, CaptionProps } from "./Caption"

export default {
  title: "Typography/Caption",
  component: Caption,
}

const Template: Story<CaptionProps> = (args) => <Caption {...args} />

export const Default = Template.bind({})
Default.args = {
  children:
    "A whole new way to ship. Designed for the majority of freight applications, starting today.",
}
