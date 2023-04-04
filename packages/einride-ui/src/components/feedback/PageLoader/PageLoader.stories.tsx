import { Meta, StoryObj } from "@storybook/react"
import { PageLoader } from "./PageLoader"

const meta = {
  component: PageLoader,
  argTypes: {
    loaderProps: {
      control: false,
    },
    text: {
      control: false,
    },
  },
} satisfies Meta<typeof PageLoader>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {} satisfies Story
