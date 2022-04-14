import { Story } from "@storybook/react/types-6-0"
import {
  LinearVerticalProgress,
  LinearVerticalProgressProps,
} from "./LinearVerticalProgress"

export default {
  title: "Charts/LinearVerticalProgress",
  component: LinearVerticalProgress,
}

const Template: Story<LinearVerticalProgressProps> = (args) => (
  <LinearVerticalProgress {...args} />
)

export const Default = Template.bind({})
Default.args = {
  "aria-label": "Progress",
  value: 50,
}
