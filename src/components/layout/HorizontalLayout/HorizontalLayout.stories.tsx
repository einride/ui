import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { HorizontalLayout } from "./HorizontalLayout"

export default {
  title: "Layout/HorizontalLayout",
  component: HorizontalLayout,
} satisfies ComponentMeta<typeof HorizontalLayout>

type Story = ComponentStoryObj<typeof HorizontalLayout>

export const Default = {
  render: (args) => (
    <HorizontalLayout {...args}>
      <Paragraph>Row 1</Paragraph>
      <Paragraph>Row 2</Paragraph>
      <PrimaryButton>Row 3</PrimaryButton>
    </HorizontalLayout>
  ),
} satisfies Story

export const None = {
  ...Default,
  args: {
    gap: "none",
  },
} satisfies Story

export const Small = {
  ...Default,
  args: {
    gap: "sm",
  },
} satisfies Story

export const Large = {
  ...Default,
  args: {
    gap: "lg",
  },
} satisfies Story
