import { Story } from "@storybook/react/types-6-0"
import {
  StepVerticalProgress,
  StepVerticalProgressProps,
} from "./StepVerticalProgress"

export default {
  title: "Charts/StepVerticalProgress",
  component: StepVerticalProgress,
}

const Template: Story<StepVerticalProgressProps> = (args) => (
  <StepVerticalProgress {...args} />
)

export const Default = Template.bind({})
Default.args = {
  completedSteps: 2,
  title: "Deliveries completed",
}
