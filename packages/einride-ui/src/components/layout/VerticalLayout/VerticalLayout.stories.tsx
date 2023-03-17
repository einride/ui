import { Meta, StoryObj } from "@storybook/react"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { VerticalLayout } from "./VerticalLayout"

const meta = {
  component: VerticalLayout,
} satisfies Meta<typeof VerticalLayout>

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

export const ExtraSmall = {
  args: {
    ...Default.args,
    gap: "xs",
  },
} satisfies Story

export const Small = {
  args: {
    ...Default.args,
    gap: "sm",
  },
} satisfies Story

export const Medium = {
  args: {
    ...Default.args,
    gap: "md",
  },
} satisfies Story

export const Large = {
  args: {
    ...Default.args,
    gap: "lg",
  },
} satisfies Story

export const ExtraLarge = {
  args: {
    ...Default.args,
    gap: "xl",
  },
} satisfies Story
