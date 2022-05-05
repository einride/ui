import { Story } from "@storybook/react/types-6-0"
import { Loader } from "./Loader"

export default {
  title: "Feedback/Loader",
  component: Loader,
}

const Template: Story = (args) => <Loader {...args} />

export const Default = Template.bind({})
Default.args = {}
