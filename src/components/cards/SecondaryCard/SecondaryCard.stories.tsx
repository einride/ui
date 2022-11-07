import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { PrimaryCard } from "../PrimaryCard/PrimaryCard"
import { SecondaryCard } from "./SecondaryCard"

export default {
  title: "Cards/SecondaryCard",
  component: SecondaryCard,
} as ComponentMeta<typeof SecondaryCard>

const Template: ComponentStory<typeof SecondaryCard> = (args) => <SecondaryCard {...args} />

export const Default = Template.bind({})
Default.args = {
  children: (
    <>
      <Paragraph>Primary</Paragraph>
      <Paragraph color="secondary">Secondary</Paragraph>
    </>
  ),
}

const InsidePrimaryCardTemplate: ComponentStory<typeof SecondaryCard> = ({ children, ...args }) => (
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
