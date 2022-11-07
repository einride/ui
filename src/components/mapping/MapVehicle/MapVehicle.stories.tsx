import { ComponentMeta, ComponentStory } from "@storybook/react"
import { MapVehicle } from "./MapVehicle"

export default {
  title: "Mapping/MapVehicle",
  component: MapVehicle,
} as ComponentMeta<typeof MapVehicle>

const Template: ComponentStory<typeof MapVehicle> = (args) => <MapVehicle {...args} />

export const Default = Template.bind({})
Default.args = {
  icon: "pod",
}
