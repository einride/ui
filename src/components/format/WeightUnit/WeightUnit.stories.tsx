import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { WeightUnit } from "./WeightUnit"

const meta = {
  title: "Format/WeightUnit",
  component: WeightUnit,
} satisfies Meta<typeof WeightUnit>

export default meta
type Story = StoryObj<typeof meta>

export const Metric = {
  args: {
    locales: "en-US",
    unitSystem: "metric",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const unit = canvas.getByText("kg")
    expect(unit).toBeInTheDocument()
  },
} satisfies Story

export const Imperial = {
  args: {
    locales: "en-US",
    unitSystem: "imperial",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const unit = canvas.getByText("lb")
    expect(unit).toBeInTheDocument()
  },
} satisfies Story

export const ImperialInSwedish = {
  args: {
    locales: "sv-SE",
    unitSystem: "imperial",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const unit = canvas.getByText("pund")
    expect(unit).toBeInTheDocument()
  },
} satisfies Story
