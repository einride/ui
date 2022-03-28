import { Story } from "@storybook/react/types-6-0"
import { StepProgress } from "../../charts/StepProgress/StepProgress"
import {
  SecondaryProgressCard,
  SecondaryProgressCardProps,
} from "./SecondaryProgressCard"

export default {
  title: "Cards/SecondaryProgressCard",
  component: SecondaryProgressCard,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/UI-Components?node-id=2715%3A611",
    },
  },
}

const Template: Story<SecondaryProgressCardProps> = (args) => (
  <SecondaryProgressCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  primaryText: "Primary",
  progress: <StepProgress completedSteps={2} />,
  secondaryText: "Secondary",
}
