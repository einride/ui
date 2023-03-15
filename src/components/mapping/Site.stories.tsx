import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import site from "./site.svg"

const Site = (): JSX.Element => <img src={site} alt="Site" />

export default {
  title: "Mapping/Site",
  component: Site,
} satisfies ComponentMeta<typeof Site>

type Story = ComponentStoryObj<typeof Site>

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toHaveAccessibleName(/site/i)
  },
} satisfies Story
