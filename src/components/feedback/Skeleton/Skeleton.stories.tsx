import { Meta, StoryObj } from "@storybook/react"
import { Skeleton } from "./Skeleton"

const meta = {
  title: "Feedback/Skeleton",
  component: Skeleton,
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

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
