import { ComponentMeta, ComponentStory } from "@storybook/react"
import { IconButton } from "../../controls/buttons/IconButton/IconButton"
import { PrimaryButton } from "../../controls/buttons/PrimaryButton/PrimaryButton"
import { SecondaryButton } from "../../controls/buttons/SecondaryButton/SecondaryButton"
import { Stack } from "./Stack"

export default {
  title: "Layout/Stack",
  component: Stack,
} as ComponentMeta<typeof Stack>

const Template: ComponentStory<typeof Stack> = (args) => (
  <Stack {...args}>
    <PrimaryButton>Button</PrimaryButton>
    <SecondaryButton>Button</SecondaryButton>
    <IconButton aria-label="Button" icon="bolt" />
  </Stack>
)

export const Default = Template.bind({})
Default.args = {}

export const AlignStart = Template.bind({})
AlignStart.args = {
  ...Default.args,
  align: "start",
}
