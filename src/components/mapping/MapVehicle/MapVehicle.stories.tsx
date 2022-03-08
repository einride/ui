import { Story } from "@storybook/react/types-6-0"
import { MapVehicle, MapVehicleProps } from "./MapVehicle"

export default {
  title: "Mapping/MapVehicle",
  component: MapVehicle,
}

const Template: Story<MapVehicleProps> = (args) => <MapVehicle {...args} />

export const Default = Template.bind({})
Default.args = {
  icon: "pod",
}
