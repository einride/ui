import { expect } from "@storybook/jest"
import { ComponentMeta, ComponentStory } from "@storybook/react"
import { within } from "@storybook/testing-library"
import { SnapshotWrapper } from "../../../lib/storybook/SnapshotWrapper"
import { Group } from "../../layout/Group/Group"
import { Label } from "./Label"

export default {
  title: "Information/Label",
  component: Label,
} as ComponentMeta<typeof Label>

export const AllVariants = (): JSX.Element => (
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

const Template: ComponentStory<typeof Label> = (args) => <Label {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: "Label",
  variant: "primary",
}
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const label = canvas.getByText("Label")
  await expect(label).toBeInTheDocument()
}

export const Secondary = Template.bind({})
Secondary.args = {
  ...Primary.args,
  variant: "secondary",
}

export const Tertiary = Template.bind({})
Tertiary.args = {
  ...Primary.args,
  variant: "tertiary",
}

export const Positive = Template.bind({})
Positive.args = {
  ...Primary.args,
  variant: "positive",
}

export const Warning = Template.bind({})
Warning.args = {
  ...Primary.args,
  variant: "warning",
}

export const Negative = Template.bind({})
Negative.args = {
  ...Primary.args,
  variant: "negative",
}

export const Accent1 = Template.bind({})
Accent1.args = {
  ...Primary.args,
  variant: "accent1",
}

export const Accent2 = Template.bind({})
Accent2.args = {
  ...Primary.args,
  variant: "accent2",
}

export const Accent3 = Template.bind({})
Accent3.args = {
  ...Primary.args,
  variant: "accent3",
}

export const Snapshot = (): JSX.Element => (
  <SnapshotWrapper>
    {[Primary, Secondary, Tertiary, Positive, Warning, Negative, Accent1, Accent2, Accent3].map(
      (Story, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Story key={index} {...Story.args}>
          {Story.args?.children}
        </Story>
      ),
    )}
  </SnapshotWrapper>
)
Snapshot.parameters = {
  chromatic: { disableSnapshot: false },
}
