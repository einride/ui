import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { PrimaryCard } from "./PrimaryCard"

export default {
  title: "Cards/PrimaryCard",
  component: PrimaryCard,
} as ComponentMeta<typeof PrimaryCard>

const Template: ComponentStory<typeof PrimaryCard> = (args) => <PrimaryCard {...args} />

export const Default = Template.bind({})
Default.args = {
  children: (
    <>
      <Paragraph>Primary</Paragraph>
      <Paragraph color="secondary">Secondary</Paragraph>
    </>
  ),
}
