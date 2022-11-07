import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Box } from "./Box"

export default {
  title: "Layout/Box",
  component: Box,
} as ComponentMeta<typeof Box>

const Template: ComponentStory<typeof Box> = (args) => <Box {...args} />

export const Background = Template.bind({})
Background.args = {
  background: "tertiary",
  borderRadius: "lg",
  height: 10,
  width: 10,
}

export const WithContent = Template.bind({})
WithContent.args = {
  background: "positive",
  borderRadius: "lg",
  children: "Content",
  color: "positive",
  padding: 2,
}
