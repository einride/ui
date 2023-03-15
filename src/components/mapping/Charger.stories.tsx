import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import charger from "./charger.svg"

const Charger = (): JSX.Element => <img src={charger} alt="Charger" />

const meta = {
  title: "Mapping/Charger",
  component: Charger,
} satisfies Meta<typeof Charger>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toHaveAccessibleName(/charger/i)
  },
} satisfies Story
