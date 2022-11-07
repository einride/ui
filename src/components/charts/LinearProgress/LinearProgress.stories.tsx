import { ComponentMeta, ComponentStory } from "@storybook/react"
import { LinearProgress } from "./LinearProgress"

export default {
  title: "Charts/LinearProgress",
  component: LinearProgress,
} as ComponentMeta<typeof LinearProgress>

const Template: ComponentStory<typeof LinearProgress> = (args) => <LinearProgress {...args} />

export const Default = Template.bind({})
Default.args = {
  "aria-label": "Progress",
  value: 50,
}
