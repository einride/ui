import { Story } from "@storybook/react/types-6-0"
import { StepProgress, StepProgressProps } from "./StepProgress"

export default {
  title: "Charts/StepProgress",
  component: StepProgress,
}

const Template: Story<StepProgressProps> = (args) => <StepProgress {...args} />

export const Default = Template.bind({})
Default.args = {
  "aria-label": "Progress",
  completedSteps: 2,
}
