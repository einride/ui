import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import chargerSmall from "./chargerSmall.svg"

const ChargerSmall = (): JSX.Element => <img src={chargerSmall} alt="Charger" />

export default {
  title: "Mapping/ChargerSmall",
  component: ChargerSmall,
} satisfies ComponentMeta<typeof ChargerSmall>

type Story = ComponentStoryObj<typeof ChargerSmall>

export const Default = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const img = canvas.getByRole("img")
    await expect(img).toHaveAccessibleName(/charger/i)
  },
} satisfies Story
