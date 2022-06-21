import { Story } from "@storybook/react/types-6-0"
import { Title1, Title1Props } from "./Title1"

export default {
  title: "Typography/Title1",
  component: Title1,
}

const Template: Story<Title1Props> = (args) => <Title1 {...args} />

export const Default = Template.bind({})
Default.args = {
  children:
    "A whole new way to ship. Designed for the majority of freight applications, starting today.",
}
