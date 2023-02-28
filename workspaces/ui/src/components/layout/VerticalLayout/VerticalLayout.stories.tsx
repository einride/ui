import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { VerticalLayout } from "./VerticalLayout"

export default {
  title: "Layout/VerticalLayout",
  component: VerticalLayout,
} satisfies ComponentMeta<typeof VerticalLayout>

type Story = ComponentStoryObj<typeof VerticalLayout>

export const Default = {
  render: (args) => (
    <VerticalLayout {...args}>
      <Paragraph>Row 1</Paragraph>
      <Paragraph>Row 2</Paragraph>
      <PrimaryButton>Row 3</PrimaryButton>
    </VerticalLayout>
  ),
} satisfies Story

export const None = {
  ...Default,
  args: {
    gap: "none",
  },
} satisfies Story

export const ExtraSmall = {
  ...Default,
  args: {
    gap: "xs",
  },
} satisfies Story

export const Small = {
  ...Default,
  args: {
    gap: "sm",
  },
} satisfies Story

export const Medium = {
  ...Default,
  args: {
    gap: "md",
  },
} satisfies Story

export const Large = {
  ...Default,
  args: {
    gap: "lg",
  },
} satisfies Story

export const ExtraLarge = {
  ...Default,
  args: {
    gap: "xl",
  },
} satisfies Story
