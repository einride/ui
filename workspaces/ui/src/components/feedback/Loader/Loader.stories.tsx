import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { Loader } from "./Loader"

export default {
  title: "Feedback/Loader",
  component: Loader,
} satisfies ComponentMeta<typeof Loader>

type Story = ComponentStoryObj<typeof Loader>

export const Default = {} satisfies Story
