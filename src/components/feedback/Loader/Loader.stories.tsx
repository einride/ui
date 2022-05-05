import { Story } from "@storybook/react/types-6-0"
import { Loader, LoaderProps } from "./Loader"

export default {
  title: "Feedback/Loader",
  component: Loader,
}

const Template: Story<LoaderProps> = (args) => <Loader {...args} />

export const Default = Template.bind({})
Default.args = {}
