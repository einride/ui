import { Meta, StoryObj } from "@storybook/react"
import { expect, within } from "@storybook/test"
import { SnapshotWrapper } from "../../../lib/storybook/SnapshotWrapper"
import { Group } from "../../layout/Group/Group"
import { Label } from "./Label"

const meta = {
  component: Label,
  args: {
    children: "Label",
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const AllVariants = {
  render: () => (
    <Group gap="sm">
      <Label variant="primary">Primary</Label>
      <Label variant="secondary">Secondary</Label>
      <Label variant="tertiary">Tertiary</Label>
      <Label variant="positive">Positive</Label>
      <Label variant="warning">Warning</Label>
      <Label variant="negative">Negative</Label>
      <Label variant="accent1">Accent1</Label>
      <Label variant="accent2">Accent2</Label>
      <Label variant="accent3">Accent3</Label>
    </Group>
  ),
} satisfies Story

export const Basic = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText("Label")
    await expect(label).toBeInTheDocument()
  },
} satisfies Story

export const Primary = {
  args: {
    variant: "primary",
  },
} satisfies Story

export const Secondary = {
  args: {
    variant: "secondary",
  },
} satisfies Story

export const Tertiary = {
  args: {
    variant: "tertiary",
  },
} satisfies Story

export const Positive = {
  args: {
    variant: "positive",
  },
} satisfies Story

export const Warning = {
  args: {
    variant: "warning",
  },
} satisfies Story

export const Negative = {
  args: {
    variant: "negative",
  },
} satisfies Story

export const Accent1 = {
  args: {
    variant: "accent1",
  },
} satisfies Story

export const Accent2 = {
  args: {
    variant: "accent2",
  },
} satisfies Story

export const Accent3 = {
  args: {
    variant: "accent3",
  },
} satisfies Story

export const Snapshot = {
  render: (args) => (
    <SnapshotWrapper>
      {[Primary, Secondary, Tertiary, Positive, Warning, Negative, Accent1, Accent2, Accent3].map(
        (Story) => (
          <Label key={Story.args.variant} {...args} {...Story.args} />
        ),
      )}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Story
