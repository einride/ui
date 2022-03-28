import { Story } from "@storybook/react/types-6-0"
import {
  PrimaryProgressCard,
  PrimaryProgressCardProps,
} from "./PrimaryProgressCard"

export default {
  title: "Cards/PrimaryProgressCard",
  component: PrimaryProgressCard,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/UI-Components?node-id=2715%3A611",
    },
  },
}

const Template: Story<PrimaryProgressCardProps> = (args) => (
  <PrimaryProgressCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  completedSteps: 2,
  primaryText: "Primary",
  secondaryText: "Secondary",
}
