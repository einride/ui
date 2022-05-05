import { Story } from "@storybook/react/types-6-0"
import { PageLoader, PageLoaderProps } from "./PageLoader"

export default {
  title: "Feedback/PageLoader",
  component: PageLoader,
}

const Template: Story<PageLoaderProps> = (args) => <PageLoader {...args} />

export const Default = Template.bind({})
Default.args = {}
