import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { Weight } from "./Weight"

const meta = {
  component: Weight,
} satisfies Meta<typeof Weight>

export default meta
type Story = StoryObj<typeof meta>

export const Metric = {
  args: {
    kilograms: 123456.789,
    locales: "en-US",
    unit: "metric",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const weight = canvas.getByText("123,456.8 kg")
    expect(weight).toBeInTheDocument()
  },
} satisfies Story

export const Imperial = {
  args: {
    kilograms: 123456.789,
    locales: "en-US",
    unit: "imperial",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const weight = canvas.getByText("272,175.6 lb")
    expect(weight).toBeInTheDocument()
  },
} satisfies Story

export const ImperialInSwedish = {
  args: {
    kilograms: 123456.789,
    locales: "sv-SE",
    unit: "imperial",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const unit = canvas.getByText("272 175,6 pund")
    expect(unit).toBeInTheDocument()
  },
} satisfies Story
