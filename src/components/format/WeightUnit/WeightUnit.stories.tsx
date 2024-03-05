import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { WeightUnit } from "./WeightUnit"

const meta = {
  component: WeightUnit,
} satisfies Meta<typeof WeightUnit>

export default meta
type Story = StoryObj<typeof meta>

/** Use `locales` and `measurementSystem` props to control output. */
export const Metric = {
  args: {
    locales: "en-US",
    measurementSystem: "metric",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const unit = canvas.getByText("kg")
    expect(unit).toBeInTheDocument()
  },
} satisfies Story

/** Change the measurement system with `measurementSystem` prop. */
export const US = {
  args: {
    locales: "en-US",
    measurementSystem: "US",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const unit = canvas.getByText("lb")
    expect(unit).toBeInTheDocument()
  },
} satisfies Story

/** Use `locales` prop to change language of output. */
export const USInSwedish = {
  args: {
    locales: "sv-SE",
    measurementSystem: "US",
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
    measurementSystem: "metric",
    numberFormatOptions: { unitDisplay: "long" },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const unit = canvas.getByText("kilograms")
    expect(unit).toBeInTheDocument()
  },
} satisfies Story
