import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { SnapshotWrapper } from "../../../lib/storybook/SnapshotWrapper"
import { contentColors } from "../../../lib/theme/types"
import { DEFAULT_MAX, DEFAULT_MIN, LinearVerticalProgress } from "./LinearVerticalProgress"

const meta = {
  component: LinearVerticalProgress,
  argTypes: {
    color: {
      control: {
        type: "select",
      },
      options: contentColors,
    },
  },
} satisfies Meta<typeof LinearVerticalProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    "aria-label": "Progress",
    value: 50,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const gauge = canvas.getByRole("progressbar", { name: Basic.args["aria-label"] })
    await expect(gauge).toHaveAttribute("aria-valuemin", DEFAULT_MIN.toString())
    await expect(gauge).toHaveAttribute("aria-valuemax", DEFAULT_MAX.toString())
    await expect(gauge).toHaveAttribute("aria-valuenow", Basic.args.value.toString())
  },
} satisfies Story

/** If you have a custom value range, you can set that with the `min` and `max` props, and `value` will take those into account. In this example, `value: 110` is 75% of the range between 80 and 110, which is also conveyed by the progress bar.  */
export const CustomRange = {
  args: {
    ...Basic.args,
    max: 120,
    min: 80,
    value: 110,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const gauge = canvas.getByRole("progressbar", { name: CustomRange.args["aria-label"] })
    await expect(gauge).toHaveAttribute("aria-valuemin", CustomRange.args.min.toString())
    await expect(gauge).toHaveAttribute("aria-valuemax", CustomRange.args.max.toString())
    await expect(gauge).toHaveAttribute("aria-valuenow", CustomRange.args.value.toString())
  },
} satisfies Story

/** Change the color of the progress bar with the `color` prop. */
export const CustomColor = {
  args: {
    ...Basic.args,
    color: "negative",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const gauge = canvas.getByRole("progressbar", { name: CustomColor.args["aria-label"] })
    await expect(gauge).toHaveAttribute("aria-valuemin", DEFAULT_MIN.toString())
    await expect(gauge).toHaveAttribute("aria-valuemax", DEFAULT_MAX.toString())
    await expect(gauge).toHaveAttribute("aria-valuenow", CustomColor.args.value.toString())
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Basic, CustomRange, CustomColor].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <LinearVerticalProgress key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies StoryObj
