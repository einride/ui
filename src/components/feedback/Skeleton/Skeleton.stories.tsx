import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { Skeleton } from "./Skeleton"

export default {
  title: "Feedback/Skeleton",
  component: Skeleton,
} satisfies ComponentMeta<typeof Skeleton>

type Story = ComponentStoryObj<typeof Skeleton>

export const Rectangle = {} satisfies Story

export const Circle = {
  args: {
    shape: "circle",
    height: "lg",
  },
} satisfies Story

export const Content = {
  args: {
    children:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dolor nihil amet tempore magnam optio, numquam nostrum inventore tempora assumenda saepe, aut repellat. Temporibus aspernatur aperiam magnam debitis facere odio?",
    height: "auto",
  },
} satisfies Story

export const WithoutAnimation = {
  args: {
    animate: false,
  },
} satisfies Story
