import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { Weight } from "./Weight"

const meta = {
  component: Weight,
} satisfies Meta<typeof Weight>

export default meta
type Story = StoryObj<typeof meta>

/** Use `locales` and `measurementSystem` props to control output. */
export const Metric = {
  args: {
    locales: "en-US",
    measurementSystem: "metric",
    weight: { unit: "kilogram", value: 123456.789 },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const weight = canvas.getByText("123,456.8 kg")
    expect(weight).toBeInTheDocument()
  },
} satisfies Story

/** Change the measurement system with `measurementSystem` prop. */
export const US = {
  args: {
    locales: "en-US",
    measurementSystem: "US",
    weight: { unit: "pound", value: 123456.789 },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const weight = canvas.getByText("123,456.8 lb")
    expect(weight).toBeInTheDocument()
  },
} satisfies Story

/** You can specify the input weight in either `kilogram` or `pound` with the `weight` prop. */
export const MetricFromPound = {
  args: {
    locales: "en-US",
    measurementSystem: "metric",
    weight: { unit: "pound", value: 123456.789 },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const weight = canvas.getByText("55,999.1 kg")
    expect(weight).toBeInTheDocument()
  },
} satisfies Story

/** Change the measurement system with `measurementSystem` prop. */
export const USFromKilogram = {
  args: {
    locales: "en-US",
    measurementSystem: "US",
    weight: { unit: "kilogram", value: 123456.789 },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const weight = canvas.getByText("272,175.6 lb")
    expect(weight).toBeInTheDocument()
  },
} satisfies Story

/** Use `locales` prop to change formatting and language of output. */
export const USInSwedish = {
  args: {
    locales: "sv-SE",
    measurementSystem: "US",
    weight: { unit: "pound", value: 123456.789 },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const unit = canvas.getByText("123 456,8 pund")
    expect(unit).toBeInTheDocument()
  },
} satisfies Story

/** `numberFormatOptions` can be used for additions options when needed. In this example, maximum significant digits is set. */
export const MaximumSignificantDigits = {
  args: {
    locales: "en-US",
    measurementSystem: "metric",
    weight: { unit: "kilogram", value: 123456.789 },
    numberFormatOptions: { maximumSignificantDigits: 3 },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const unit = canvas.getByText("123,000 kg")
    expect(unit).toBeInTheDocument()
  },
} satisfies Story
