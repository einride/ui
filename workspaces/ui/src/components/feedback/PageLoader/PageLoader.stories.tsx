import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { PageLoader } from "./PageLoader"

export default {
  title: "Feedback/PageLoader",
  component: PageLoader,
} satisfies ComponentMeta<typeof PageLoader>

type Story = ComponentStoryObj<typeof PageLoader>

export const Default = {} satisfies Story
