import { Meta, StoryObj } from "@storybook/react"
import { spacings } from "../../../lib/theme/types"
import { Skeleton } from "./Skeleton"

const meta = {
  component: Skeleton,
  argTypes: {
    height: {
      control: {
        type: "select",
      },
      options: [...spacings, "auto"],
    },
  },
  parameters: {
    controls: { include: ["animate", "height", "shape", "visible"] },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {} satisfies Story

/** For non-text elements, a circle might be a better shape for the skeleton. */
export const Circle = {
  args: {
    shape: "circle",
    height: "lg",
  },
} satisfies Story

/** When covering something with the skeleton that is already mounted, you can use `blockSize: auto` for inferring the right dimensions. */
export const Content = {
  args: {
    children:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi dolor nihil amet tempore magnam optio, numquam nostrum inventore tempora assumenda saepe, aut repellat. Temporibus aspernatur aperiam magnam debitis facere odio?",
    height: "auto",
  },
} satisfies Story

/** The waving animation can be turned off. */
export const WithoutAnimation = {
  args: {
    animate: false,
  },
} satisfies Story
