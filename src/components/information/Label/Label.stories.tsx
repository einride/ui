import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { Group } from "../../layout/Group/Group"
import { Label } from "./Label"

export default {
  title: "Information/Label",
  component: Label,
} as ComponentMeta<typeof Label>

const AllVariantsTemplate: ComponentStory<typeof Label> = () => (
  <Group gap="sm">
    <Label variant="primary">Primary</Label>
    <Label variant="secondary">Secondary</Label>
    <Label variant="tertiary">Tertiary</Label>
    <Label variant="positive">Positive</Label>
    <Label variant="warning">Warning</Label>
    <Label variant="negative">Negative</Label>
    <Label variant="accent1">Accent1</Label>
    <Label variant="accent2">Accent2</Label>
    <Label variant="accent3">Accent3</Label>
  </Group>
)

export const AllVariants = AllVariantsTemplate.bind({})
AllVariants.args = {}

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: "Label",
}
Basic.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const label = canvas.getByText("Label")
  await expect(label).toBeInTheDocument()
}
