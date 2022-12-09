import { ComponentMeta, ComponentStory } from "@storybook/react"
import { PageLoader } from "./PageLoader"

export default {
  title: "Feedback/PageLoader",
  component: PageLoader,
} as ComponentMeta<typeof PageLoader>

const Template: ComponentStory<typeof PageLoader> = (args) => <PageLoader {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.parameters = {
  chromatic: { disableSnapshot: true },
}
