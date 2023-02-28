import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import pod from "./pod.svg"

const Pod = (): JSX.Element => <img src={pod} alt="Pod" />

export default {
  title: "Mapping/Pod",
  component: Pod,
} satisfies ComponentMeta<typeof Pod>

type Story = ComponentStoryObj<typeof Pod>

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toHaveAccessibleName(/pod/i)
  },
} satisfies Story
