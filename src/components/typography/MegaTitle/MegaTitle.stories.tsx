import { ComponentStoryObj, Meta } from "@storybook/react"
import { MegaTitle } from "./MegaTitle"

export default {
  title: "Typography/MegaTitle",
  component: MegaTitle,
} satisfies Meta<typeof MegaTitle>

type Story = ComponentStoryObj<typeof MegaTitle>

export const Default = {
  args: {
    children: "A whole new way to ship.",
  },
} satisfies Story
