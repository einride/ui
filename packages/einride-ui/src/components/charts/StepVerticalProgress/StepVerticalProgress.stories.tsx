import { expect } from "@storybook/jest"
import { Meta, StoryObj } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { SnapshotWrapper } from "../../../lib/storybook/SnapshotWrapper"
import { contentColors } from "../../../lib/theme/types"
import { DEFAULT_STEPS, StepVerticalProgress } from "./StepVerticalProgress"

const meta = {
  component: StepVerticalProgress,
  argTypes: {
    color: {
      control: {
        type: "select",
      },
      options: contentColors,
    },
  },
} satisfies Meta<typeof StepVerticalProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Basic = {
  args: {
    "aria-label": "Deliveries completed",
    completedSteps: 2,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const gauge = canvas.getByRole("progressbar", { name: Basic.args["aria-label"] })
    await expect(gauge).toHaveAttribute("aria-valuemin", "0")
    await expect(gauge).toHaveAttribute("aria-valuemax", DEFAULT_STEPS.toString())
    await expect(gauge).toHaveAttribute("aria-valuenow", Basic.args.completedSteps.toString())
  },
} satisfies Story

/** The amount of steps can be customized with the `steps` prop. */
export const CustomSteps = {
  args: {
    ...Basic.args,
    steps: 10,
    completedSteps: 4,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const gauge = canvas.getByRole("progressbar", { name: CustomSteps.args["aria-label"] })
    await expect(gauge).toHaveAttribute("aria-valuemin", "0")
    await expect(gauge).toHaveAttribute("aria-valuemax", CustomSteps.args.steps.toString())
    await expect(gauge).toHaveAttribute("aria-valuenow", CustomSteps.args.completedSteps.toString())
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
    await expect(gauge).toHaveAttribute("aria-valuemin", "0")
    await expect(gauge).toHaveAttribute("aria-valuemax", DEFAULT_STEPS.toString())
    await expect(gauge).toHaveAttribute("aria-valuenow", CustomColor.args.completedSteps.toString())
  },
} satisfies Story

export const Snapshot = {
  render: () => (
    <SnapshotWrapper>
      {[Basic, CustomSteps, CustomColor].map((Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <StepVerticalProgress key={index} {...Story.args} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies StoryObj
