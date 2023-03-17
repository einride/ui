import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import pod from "./pod.svg"

const Pod = (): JSX.Element => <img src={pod} alt="Pod" />

const meta = {
  component: Pod,
} satisfies Meta<typeof Pod>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toHaveAccessibleName(/pod/i)
  },
} satisfies Story
