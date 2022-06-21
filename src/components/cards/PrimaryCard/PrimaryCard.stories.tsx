import { Story } from "@storybook/react/types-6-0"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { PrimaryCard, PrimaryCardProps } from "./PrimaryCard"

export default {
  title: "Cards/PrimaryCard",
  component: PrimaryCard,
}

const Template: Story<PrimaryCardProps> = (args) => <PrimaryCard {...args} />

export const Default = Template.bind({})
Default.args = {
  children: (
    <>
      <Paragraph>Primary</Paragraph>
      <Paragraph color="secondary">Secondary</Paragraph>
    </>
  ),
}
