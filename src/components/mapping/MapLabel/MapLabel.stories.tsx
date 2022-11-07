import { ComponentMeta, ComponentStory } from "@storybook/react"
import { MapLabel } from "./MapLabel"

export default {
  title: "Mapping/MapLabel",
  component: MapLabel,
} as ComponentMeta<typeof MapLabel>

const Template: ComponentStory<typeof MapLabel> = (args) => <MapLabel {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <>Label</>,
}
