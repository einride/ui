import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import charger from "./charger.svg"

const Charger = (): JSX.Element => <img src={charger} alt="Charger" />

export default {
  title: "Mapping/Charger",
  component: Charger,
} satisfies ComponentMeta<typeof Charger>

type Story = ComponentStoryObj<typeof Charger>

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toHaveAccessibleName(/charger/i)
  },
} satisfies Story
