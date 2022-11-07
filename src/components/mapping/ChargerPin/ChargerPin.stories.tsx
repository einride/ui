import { ComponentMeta, ComponentStory } from "@storybook/react"
import { ChargerPin } from "./ChargerPin"

export default {
  title: "Mapping/ChargerPin",
  component: ChargerPin,
} as ComponentMeta<typeof ChargerPin>

const Template: ComponentStory<typeof ChargerPin> = (args) => <ChargerPin {...args} />

export const Default = Template.bind({})
Default.args = {
  size: "md",
}
