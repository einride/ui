import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import chargerSmall from "./chargerSmall.svg"

const ChargerSmall = (): JSX.Element => <img src={chargerSmall} alt="Charger" />

const meta = {
  component: ChargerSmall,
} satisfies Meta<typeof ChargerSmall>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toHaveAccessibleName(/charger/i)
  },
} satisfies Story
