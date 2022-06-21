import { Story } from "@storybook/react/types-6-0"
import { Title2, Title2Props } from "./Title2"

export default {
  title: "Typography/Title2",
  component: Title2,
}

const Template: Story<Title2Props> = (args) => <Title2 {...args} />

export const Default = Template.bind({})
Default.args = {
  children:
    "A whole new way to ship. Designed for the majority of freight applications, starting today.",
}
