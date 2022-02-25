import { Story } from "@storybook/react/types-6-0"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { PrimaryCard } from "../PrimaryCard/PrimaryCard"
import { SecondaryCard, SecondaryCardProps } from "./SecondaryCard"

export default {
  title: "Cards/SecondaryCard",
  component: SecondaryCard,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/YYzIjuZlggbzY16y5gGyWB/UI-Components?node-id=2715%3A611",
    },
  },
}

const Template: Story<SecondaryCardProps> = (args) => (
  <SecondaryCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: (
    <>
      <Paragraph>Primary</Paragraph>
      <Paragraph color="secondary">Secondary</Paragraph>
    </>
  ),
}

const InsidePrimaryCardTemplate: Story<SecondaryCardProps> = ({
  children,
  ...args
}) => (
  <PrimaryCard {...args}>
    <Paragraph>Primary</Paragraph>
    <Paragraph color="secondary">Secondary</Paragraph>
    {children}
  </PrimaryCard>
)

export const InsidePrimaryCard = InsidePrimaryCardTemplate.bind({})
InsidePrimaryCard.args = {
  children: (
    <SecondaryCard>
      <Paragraph>Primary</Paragraph>
      <Paragraph color="secondary">Secondary</Paragraph>
    </SecondaryCard>
  ),
}
