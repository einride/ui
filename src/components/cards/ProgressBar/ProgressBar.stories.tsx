import { Story } from "@storybook/react/types-6-0"
import { ProgressBar, ProgressBarProps } from "./ProgressBar"

export default {
  title: "Cards/ProgressBar",
  component: ProgressBar,
}

const Template: Story<ProgressBarProps> = (args) => <ProgressBar {...args} />

export const Default = Template.bind({})
Default.args = {
  totalSteps: 4,
  completedSteps: 2,
  style: { width: "300px", maxWidth: "100%" },
}
