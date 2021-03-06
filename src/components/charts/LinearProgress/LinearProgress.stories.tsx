import { Story } from "@storybook/react/types-6-0"
import { LinearProgress, LinearProgressProps } from "./LinearProgress"

export default {
  title: "Charts/LinearProgress",
  component: LinearProgress,
}

const Template: Story<LinearProgressProps> = (args) => <LinearProgress {...args} />

export const Default = Template.bind({})
Default.args = {
  "aria-label": "Progress",
  value: 50,
}
