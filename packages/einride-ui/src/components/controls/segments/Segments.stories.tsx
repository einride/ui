import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { userEvent, within } from "@storybook/testing-library"
import { useState } from "react"
import { Weight } from "../../format/Weight/Weight"
import { Box } from "../../layout/Box/Box"
import { Group } from "../../layout/Group/Group"
import { Stack } from "../../layout/Stack/Stack"
import { Segments } from "./Segments"
import { SegmentsItem } from "./SegmentsItem"

const meta = {
  component: Segments,
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof Segments>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    children: (
      <>
        <SegmentsItem value="kilogram">Kilogram</SegmentsItem>
        <SegmentsItem value="pound">Pound</SegmentsItem>
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const kilogram = canvas.getByRole("radio", { name: "Kilogram" })
    const pound = canvas.getByRole("radio", { name: "Pound" })

    await step("Expect no segment to be selected initially", async () => {
      await expect(kilogram).toHaveAttribute("aria-checked", "false")
      await expect(pound).toHaveAttribute("aria-checked", "false")
    })
  },
} satisfies Story

/** Set a default selected segment with `defaultValue` prop. */
export const DefaultValue = {
  args: {
    children: (
      <>
        <SegmentsItem value="kilogram">Kilogram</SegmentsItem>
        <SegmentsItem value="pound">Pound</SegmentsItem>
      </>
    ),
    defaultValue: "kilogram",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const radioGroup = canvas.getByRole("radiogroup")
    const kilogram = within(radioGroup).getByRole("radio", { name: "Kilogram" })
    const pound = within(radioGroup).getByRole("radio", { name: "Pound" })

    await step("Expect default segment to be selected initially", async () => {
      await expect(kilogram).toBeChecked()
      await expect(pound).not.toBeChecked()
    })
  },
} satisfies Story

const ControlledTemplate = (): React.JSX.Element => {
  const [unit, setUnit] = useState("kilogram")
  return (
    <Segments onValueChange={setUnit} value={unit}>
      <SegmentsItem value="kilogram">Kilogram</SegmentsItem>
      <SegmentsItem value="pound">Pound</SegmentsItem>
    </Segments>
  )
}

/** Use `value` and `onValueChange` when you need controlled segments. */
export const Controlled = {
  render: () => <ControlledTemplate />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const radioGroup = canvas.getByRole("radiogroup")
    const kilogram = within(radioGroup).getByRole("radio", { name: "Kilogram" })
    const pound = within(radioGroup).getByRole("radio", { name: "Pound" })

    await step("Expect default segment to be selected initially", async () => {
      await expect(kilogram).toBeChecked()
      await expect(pound).not.toBeChecked()
    })
  },
} satisfies StoryObj

const MeasurementSystemTemplate = (): React.JSX.Element => {
  const [unit, setUnit] = useState("kilogram")
  return (
    <Stack alignItems="start">
      <Segments onValueChange={setUnit} value={unit}>
        <SegmentsItem value="kilogram">Kilogram</SegmentsItem>
        <SegmentsItem value="pound">Pound</SegmentsItem>
      </Segments>
      <Weight
        weight={{ unit: "kilogram", value: 1000 }}
        locales="en-US"
        measurementSystem={unit === "kilogram" ? "metric" : "US"}
      />
    </Stack>
  )
}

/** Control something based on active segment by using state. */
export const MeasurementSystem = {
  render: () => <MeasurementSystemTemplate />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const radioGroup = canvas.getByRole("radiogroup")
    const kilogram = within(radioGroup).getByRole("radio", { name: "Kilogram" })
    const pound = within(radioGroup).getByRole("radio", { name: "Pound" })

    await step("Expect kilograms to show initially", async () => {
      await expect(kilogram).toBeChecked()
      await expect(pound).not.toBeChecked()
      await expect(canvas.getByText("1,000 kg")).toBeInTheDocument()
    })
  },
} satisfies StoryObj

const WithLabelTemplate = (): React.JSX.Element => {
  const [activeSegment, setActiveSegment] = useState("segment-1")
  return (
    <Segments onValueChange={setActiveSegment} value={activeSegment}>
      <SegmentsItem value="segment-1">
        <Group gap="xs">
          <span>Segment</span>
          <Box
            as="span"
            display="flex"
            justifyContent="center"
            alignItems="center"
            background="tertiary"
            borderRadius="full"
            blockSize={3}
            inlineSize={3}
          >
            1
          </Box>
        </Group>
      </SegmentsItem>
      <SegmentsItem value="segment-2">Segment</SegmentsItem>
    </Segments>
  )
}

/** You can format the segments according to your needs by passing custom `children`. */
export const WithLabel = {
  render: () => <WithLabelTemplate />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const radioGroup = canvas.getByRole("radiogroup")
    const segment1 = within(radioGroup).getByRole("radio", { name: "Segment 1" })
    const segment2 = within(radioGroup).getByRole("radio", { name: "Segment" })

    await step("Expect default tab to be selected initially", async () => {
      await expect(segment1).toBeChecked()
      await expect(segment2).not.toBeChecked()
    })
  },
} satisfies StoryObj

export const Pointer = {
  render: () => <MeasurementSystemTemplate />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const radioGroup = canvas.getByRole("radiogroup")
    const kilogram = within(radioGroup).getByRole("radio", { name: "Kilogram" })
    const pound = within(radioGroup).getByRole("radio", { name: "Pound" })

    await step("Expect kilograms to show initially", async () => {
      await expect(kilogram).toBeChecked()
      await expect(pound).not.toBeChecked()
      await expect(canvas.getByText("1,000 kg")).toBeInTheDocument()
    })

    await step("Expect pounds to show when clicking the pound tab", async () => {
      await userEvent.click(pound)
      await expect(kilogram).not.toBeChecked()
      await expect(pound).toBeChecked()
      await expect(canvas.getByText("2,204.6 lb")).toBeInTheDocument()
    })
  },
} satisfies StoryObj

export const Keyboard = {
  render: () => <MeasurementSystemTemplate />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const radioGroup = canvas.getByRole("radiogroup")
    const kilogram = within(radioGroup).getByRole("radio", { name: "Kilogram" })
    const pound = within(radioGroup).getByRole("radio", { name: "Pound" })

    await step("Expect kilograms to show initially", async () => {
      await expect(kilogram).toBeChecked()
      await expect(pound).not.toBeChecked()
      await expect(canvas.getByText("1,000 kg")).toBeInTheDocument()
      await expect(kilogram).not.toHaveFocus()
      await userEvent.click(kilogram)
      await expect(kilogram).toHaveFocus()
    })

    await step("Expect pound to show when clicking ArrowRight", async () => {
      await userEvent.click(pound) // TODO: Change to `userEvent.keyboard("[ArrowRight]")` when supported
      await expect(kilogram).not.toBeChecked()
      await expect(pound).toBeChecked()
      await expect(canvas.getByText("2,204.6 lb")).toBeInTheDocument()
    })
  },
} satisfies StoryObj
