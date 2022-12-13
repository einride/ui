import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Skeleton } from "./Skeleton"

export default {
  title: "Feedback/Skeleton",
  component: Skeleton,
} as ComponentMeta<typeof Skeleton>

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />

export const Rectangle = Template.bind({})
Rectangle.args = {}

export const Circle = Template.bind({})
Circle.args = {
  shape: "circle",
  height: "lg",
}

export const Content = Template.bind({})
Content.args = {
  children:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dolor nihil amet tempore magnam optio, numquam nostrum inventore tempora assumenda saepe, aut repellat. Temporibus aspernatur aperiam magnam debitis facere odio?",
  height: "auto",
}

export const WithoutAnimation = Template.bind({})
WithoutAnimation.args = {
  animate: false,
}
