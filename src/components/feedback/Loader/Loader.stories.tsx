import { Meta, StoryObj } from "@storybook/react"
import { Loader } from "./Loader"

const meta = {
  title: "Feedback/Loader",
  component: Loader,
} satisfies Meta<typeof Loader>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story
