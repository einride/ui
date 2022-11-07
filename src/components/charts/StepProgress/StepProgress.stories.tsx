import { ComponentMeta, ComponentStory } from "@storybook/react"
import { StepProgress } from "./StepProgress"

export default {
  title: "Charts/StepProgress",
  component: StepProgress,
} as ComponentMeta<typeof StepProgress>

const Template: ComponentStory<typeof StepProgress> = (args) => <StepProgress {...args} />

export const Default = Template.bind({})
Default.args = {
  completedSteps: 2,
  title: "Electrification potential",
}
