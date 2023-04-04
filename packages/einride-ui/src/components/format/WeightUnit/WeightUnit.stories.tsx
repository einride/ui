import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { WeightUnit } from "./WeightUnit"

const meta = {
  component: WeightUnit,
} satisfies Meta<typeof WeightUnit>

export default meta
type Story = StoryObj<typeof meta>

/** Use `locales` and `unit` props to control output. */
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

/** Change the unit system with `unit` prop. */
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

/** Use `locales` prop to change formatting and language of output. */
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

/** `numberFormatOptions` can be used for additions options when needed. In this example, long unit display style is used. */
export const Long = {
  args: {
    locales: "en-US",
    unitSystem: "metric",
    numberFormatOptions: { unitDisplay: "long" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const unit = canvas.getByText("kilograms")
    expect(unit).toBeInTheDocument()
  },
} satisfies Story
