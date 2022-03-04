import { Story } from "@storybook/react/types-6-0"
import { MapPod, MapPodProps } from "./MapPod"

export default {
  title: "Mapping/MapPod",
  component: MapPod,
}

const Template: Story<MapPodProps> = (args) => <MapPod {...args} />

export const Default = Template.bind({})
Default.args = {}
