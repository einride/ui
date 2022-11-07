import { ComponentMeta, ComponentStory } from "@storybook/react"
import { StepVerticalProgress } from "./StepVerticalProgress"

export default {
  title: "Charts/StepVerticalProgress",
  component: StepVerticalProgress,
} as ComponentMeta<typeof StepVerticalProgress>

const Template: ComponentStory<typeof StepVerticalProgress> = (args) => (
  <StepVerticalProgress {...args} />
)

export const Default = Template.bind({})
Default.args = {
  "aria-label": "Deliveries completed",
  completedSteps: 2,
}
