import { Meta, StoryObj } from "@storybook/react"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { HorizontalLayout } from "./HorizontalLayout"

const meta = {
  component: HorizontalLayout,
} satisfies Meta<typeof HorizontalLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {
    children: (
      <>
        <Paragraph>Row 1</Paragraph>
        <Paragraph>Row 2</Paragraph>
        <PrimaryButton>Row 3</PrimaryButton>
      </>
    ),
  },
} satisfies Story

export const None = {
  args: {
    ...Default.args,
    gap: "none",
  },
} satisfies Story

export const Small = {
  args: {
    ...Default.args,
    gap: "sm",
  },
} satisfies Story

export const Large = {
  args: {
    ...Default.args,
    gap: "lg",
  },
} satisfies Story
