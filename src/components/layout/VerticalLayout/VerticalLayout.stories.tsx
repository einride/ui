import { ComponentMeta, ComponentStory } from "@storybook/react"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { VerticalLayout } from "./VerticalLayout"

export default {
  title: "Layout/VerticalLayout",
  component: VerticalLayout,
} as ComponentMeta<typeof VerticalLayout>

const Template: ComponentStory<typeof VerticalLayout> = (args) => (
  <VerticalLayout {...args}>
    <Paragraph>Row 1</Paragraph>
    <Paragraph>Row 2</Paragraph>
    <PrimaryButton>Row 3</PrimaryButton>
  </VerticalLayout>
)

export const Default = Template.bind({})
Default.args = {}

export const None = Template.bind({})
None.args = {
  gap: "none",
}

export const ExtraSmall = Template.bind({})
ExtraSmall.args = {
  gap: "xs",
}

export const Small = Template.bind({})
Small.args = {
  gap: "sm",
}

export const Medium = Template.bind({})
Medium.args = {
  gap: "md",
}

export const Large = Template.bind({})
Large.args = {
  gap: "lg",
}

export const ExtraLarge = Template.bind({})
ExtraLarge.args = {
  gap: "xl",
}
