import { Story } from "@storybook/react/types-6-0"
import { Skeleton, SkeletonProps } from "./Skeleton"

export default {
  title: "Feedback/Skeleton",
  component: Skeleton,
}

const Template: Story<SkeletonProps> = (args) => <Skeleton {...args} />

export const Default = Template.bind({})
Default.args = {}
