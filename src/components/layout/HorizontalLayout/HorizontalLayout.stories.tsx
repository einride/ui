import { ComponentMeta, ComponentStory } from "@storybook/react"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { HorizontalLayout } from "./HorizontalLayout"

export default {
  title: "Layout/HorizontalLayout",
  component: HorizontalLayout,
} as ComponentMeta<typeof HorizontalLayout>

const Template: ComponentStory<typeof HorizontalLayout> = (args) => (
  <HorizontalLayout {...args}>
    <Paragraph>Row 1</Paragraph>
    <Paragraph>Row 2</Paragraph>
    <PrimaryButton>Row 3</PrimaryButton>
  </HorizontalLayout>
)

export const Default = Template.bind({})
Default.args = {}

export const None = Template.bind({})
None.args = {
  gap: "none",
}

export const Small = Template.bind({})
Small.args = {
  gap: "sm",
}

export const Large = Template.bind({})
Large.args = {
  gap: "lg",
}
