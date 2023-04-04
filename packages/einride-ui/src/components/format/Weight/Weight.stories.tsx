import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { Weight } from "./Weight"

const meta = {
  component: Weight,
} satisfies Meta<typeof Weight>

export default meta
type Story = StoryObj<typeof meta>

/** Use `locales` and `unit` props to control output. */
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

/** Change the unit system with `unit` prop. */
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

/** Use `locales` prop to change formatting and language of output. */
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

/** `numberFormatOptions` can be used for additions options when needed. In this example, maximum significant digits is set. */
export const MaximumSignificantDigits = {
  args: {
    kilograms: 123456.789,
    locales: "en-US",
    unit: "metric",
    numberFormatOptions: { maximumSignificantDigits: 3 },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const unit = canvas.getByText("123,000 kg")
    expect(unit).toBeInTheDocument()
  },
} satisfies Story
