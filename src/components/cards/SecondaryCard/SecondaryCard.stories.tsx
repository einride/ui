import { Story } from "@storybook/react/types-6-0"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { PrimaryCard } from "../PrimaryCard/PrimaryCard"
import { SecondaryCard, SecondaryCardProps } from "./SecondaryCard"

export default {
  title: "Cards/SecondaryCard",
  component: SecondaryCard,
}

const Template: Story<SecondaryCardProps> = (args) => <SecondaryCard {...args} />

export const Default = Template.bind({})
Default.args = {
  children: (
    <>
      <Paragraph>Primary</Paragraph>
      <Paragraph color="secondary">Secondary</Paragraph>
    </>
  ),
}

const InsidePrimaryCardTemplate: Story<SecondaryCardProps> = ({ children, ...args }) => (
  <PrimaryCard background="secondary" {...args}>
    <Paragraph>Primary</Paragraph>
    <Paragraph color="secondary">Secondary</Paragraph>
    {children}
  </PrimaryCard>
)

export const InsidePrimaryCard = InsidePrimaryCardTemplate.bind({})
InsidePrimaryCard.args = {
  children: (
    <SecondaryCard background="primary">
      <Paragraph>Primary</Paragraph>
      <Paragraph color="secondary">Secondary</Paragraph>
    </SecondaryCard>
  ),
}
