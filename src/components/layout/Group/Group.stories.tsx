import { ComponentMeta, ComponentStory } from "@storybook/react"
import { IconButton } from "../../controls/buttons/IconButton/IconButton"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { SecondaryButton } from "../../controls/buttons/SecondaryButton/SecondaryButton"
import { Group } from "./Group"

export default {
  title: "Layout/Group",
  component: Group,
} as ComponentMeta<typeof Group>

const Template: ComponentStory<typeof Group> = (args) => (
  <Group {...args}>
    <PrimaryButton>Button</PrimaryButton>
    <SecondaryButton>Button</SecondaryButton>
    <IconButton aria-label="Button" icon="bolt" />
  </Group>
)

export const Default = Template.bind({})
Default.args = {}

export const SpaceBetween = Template.bind({})
SpaceBetween.args = {
  ...Default.args,
  justifyContent: "space-between",
}
