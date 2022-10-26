import { ComponentMeta, ComponentStory } from "@storybook/react"
import { TextInput } from "../../controls/inputs/TextInput/TextInput"
import { Paragraph } from "../../typography/Paragraph/Paragraph"
import { Stack } from "./Stack"

export default {
  title: "Layout/Stack",
  component: Stack,
} as ComponentMeta<typeof Stack>

const Template: ComponentStory<typeof Stack> = (args) => (
  <Stack {...args}>
    <Paragraph>This is the first row in the stack.</Paragraph>
    <TextInput label="First and last name" />
    <Paragraph>This is the last row in the stack.</Paragraph>
  </Stack>
)

export const Default = Template.bind({})
Default.args = {}

export const Custom = Template.bind({})
Custom.args = {
  ...Default.args,
  align: "stretch",
  gap: "xl",
  width: "50%",
  justify: "center",
}
