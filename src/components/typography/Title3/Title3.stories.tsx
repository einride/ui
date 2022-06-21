import { Story } from "@storybook/react/types-6-0"
import { Title3, Title3Props } from "./Title3"

export default {
  title: "Typography/Title3",
  component: Title3,
}

const Template: Story<Title3Props> = (args) => <Title3 {...args} />

export const Default = Template.bind({})
Default.args = {
  children:
    "A whole new way to ship. Designed for the majority of freight applications, starting today.",
}
