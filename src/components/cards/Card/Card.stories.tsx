import { ComponentMeta, ComponentStory } from "@storybook/react"
import { StepGauge } from "../../charts/StepGauge/StepGauge"
import { StepProgress } from "../../charts/StepProgress/StepProgress"
import { Icon } from "../../content/Icon/Icon"
import { TextInput } from "../../controls/inputs/TextInput/TextInput"
import { Group } from "../../layout/Group/Group"
import { Stack } from "../../layout/Stack/Stack"
import { Text } from "../../typography/Text/Text"
import { Card } from "./Card"

export default {
  title: "Cards/Card",
  component: Card,
} as ComponentMeta<typeof Card>

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />

export const Gauge = Template.bind({})
Gauge.args = {
  background: "secondary",
  children: (
    <Group justifyContent="space-between">
      <Stack gap="none">
        <Text color="secondary">Electrification potential</Text>
        <Text>Good</Text>
      </Stack>
      <StepGauge aria-label="Electrification potential" steps={3} completedSteps={2} />
    </Group>
  ),
}

export const Progress = Template.bind({})
Progress.args = {
  background: "secondary",
  paddingBlockEnd: "sm",
  children: (
    <Stack gap="sm">
      <Group justifyContent="space-between">
        <Text>
          Sweden <Icon name="arrowRight" /> Germany
        </Text>
        <Text color="positive">In transit</Text>
      </Group>
      <StepProgress
        aria-label="Progress on transit between Sweden and Germany"
        completedSteps={2}
      />
    </Stack>
  ),
}

export const Stat = Template.bind({})
Stat.args = {
  background: "secondary",
  children: (
    <Stack height={22} justifyContent="space-between">
      <Group justifyContent="space-between">
        <Text color="secondary">Emissions</Text>
        <Text color="secondary">
          <Text as="span" color="positive">
            <Icon name="arrowDown" />
            3%
          </Text>{" "}
          this year
        </Text>
      </Group>
      <Text as="p" variant="titleLg">
        230 tn
      </Text>
    </Stack>
  ),
}

export const InsideCard = Template.bind({})
InsideCard.args = {
  background: "secondary",
  children: (
    <Stack>
      <Group justifyContent="space-between">
        <Text>Slot</Text>
        <Text>Slot</Text>
      </Group>
      <Card background="secondary" borderRadius="sm">
        <Text color="secondary">Electrification potential</Text>
        <Text>Good</Text>
      </Card>
    </Stack>
  ),
}

export const WithInput = Template.bind({})
WithInput.args = {
  background: "secondary",
  children: (
    <Stack>
      <Text>Slot</Text>
      <TextInput label="Label" />
    </Stack>
  ),
}
