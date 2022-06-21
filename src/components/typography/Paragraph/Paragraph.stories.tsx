import { Story } from "@storybook/react/types-6-0"
import { Paragraph, ParagraphProps } from "./Paragraph"

export default {
  title: "Typography/Paragraph",
  component: Paragraph,
}

const Template: Story<ParagraphProps> = (args) => <Paragraph {...args} />

export const Default = Template.bind({})
Default.args = {
  children:
    "A whole new way to ship. Designed for the majority of freight applications, starting today.",
}
