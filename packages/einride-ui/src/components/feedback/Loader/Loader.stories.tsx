import { Meta, StoryObj } from "@storybook/react"
import { Loader } from "./Loader"

/** A loading indicator. */
const meta = {
  component: Loader,
} satisfies Meta<typeof Loader>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {} satisfies Story
