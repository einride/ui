import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { useState } from "react"
import { Weight } from "../../format/Weight/Weight"
import { Stack } from "../../layout/Stack/Stack"
import { Segments } from "./Segments"
import { SegmentsTrigger } from "./SegmentsTrigger"

const meta = {
  component: Segments,
} satisfies Meta<typeof Segments>

export default meta

const BasicTemplate = (): JSX.Element => {
  const [activeSegment, setActiveSegment] = useState("segment-1")
  return (
    <Segments onValueChange={setActiveSegment} value={activeSegment}>
      <SegmentsTrigger value="segment-1">Segment 1</SegmentsTrigger>
      <SegmentsTrigger value="segment-2">Segment 2</SegmentsTrigger>
    </Segments>
  )
}

export const Basic = {
  render: () => <BasicTemplate />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const tab1 = canvas.getByRole("tab", { name: "Segment 1" })
    await expect(tab1).toHaveAttribute("aria-selected", "true")
    const tab2 = canvas.getByRole("tab", { name: "Segment 2" })
    await expect(tab2).toHaveAttribute("aria-selected", "false")
  },
} satisfies StoryObj

const MeasurementSystemTemplate = (): JSX.Element => {
  const [unit, setUnit] = useState("kilogram")
  return (
    <Stack alignItems="start">
      <Segments onValueChange={setUnit} value={unit}>
        <SegmentsTrigger value="kilogram">Kilogram</SegmentsTrigger>
        <SegmentsTrigger value="pound">Pound</SegmentsTrigger>
      </Segments>
      <Weight
        weight={{ unit: "kilogram", value: 1000 }}
        locales="en-US"
        measurementSystem={unit === "kilogram" ? "metric" : "US"}
      />
    </Stack>
  )
}

export const Pointer = {
  render: () => <MeasurementSystemTemplate />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const tab1 = canvas.getByRole("tab", { name: "Kilogram" })
    const tab2 = canvas.getByRole("tab", { name: "Pound" })

    await step("Expect kilograms to show initially", async () => {
      await expect(tab1).toHaveAttribute("aria-selected", "true")
      await expect(tab2).toHaveAttribute("aria-selected", "false")
      await expect(canvas.getByText("1,000 kg")).toBeInTheDocument()
    })

    await step("Expect pounds to show when clicking the pound tab", async () => {
      await userEvent.click(tab2)
      await expect(tab1).toHaveAttribute("aria-selected", "false")
      await expect(tab2).toHaveAttribute("aria-selected", "true")
      await expect(canvas.getByText("2,204.6 lb")).toBeInTheDocument()
    })
  },
} satisfies StoryObj

export const Keyboard = {
  render: () => <MeasurementSystemTemplate />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const tab1 = canvas.getByRole("tab", { name: "Kilogram" })
    const tab2 = canvas.getByRole("tab", { name: "Pound" })

    await step("Expect kilograms to show initially", async () => {
      await expect(tab1).toHaveAttribute("aria-selected", "true")
      await expect(tab2).toHaveAttribute("aria-selected", "false")
      await expect(canvas.getByText("1,000 kg")).toBeInTheDocument()
      await expect(tab1).not.toHaveFocus()
      await userEvent.click(tab1)
      await expect(tab1).toHaveFocus()
    })

    await step("Expect pound to show when clicking ArrowRight", async () => {
      await userEvent.keyboard("[ArrowRight]")
      await expect(tab1).toHaveAttribute("aria-selected", "false")
      await expect(tab2).toHaveAttribute("aria-selected", "true")
      await expect(canvas.getByText("2,204.6 lb")).toBeInTheDocument()
    })
  },
} satisfies StoryObj
