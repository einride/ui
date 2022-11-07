import { ComponentMeta, ComponentStory } from "@storybook/react"
import { LinearVerticalProgress } from "./LinearVerticalProgress"

export default {
  title: "Charts/LinearVerticalProgress",
  component: LinearVerticalProgress,
} as ComponentMeta<typeof LinearVerticalProgress>

const Template: ComponentStory<typeof LinearVerticalProgress> = (args) => (
  <LinearVerticalProgress {...args} />
)

export const Default = Template.bind({})
Default.args = {
  "aria-label": "Progress",
  value: 50,
}
