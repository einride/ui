import { Story } from "@storybook/react/types-6-0"
import { MapLabel, MapLabelProps } from "./MapLabel"

export default {
  title: "Mapping/MapLabel",
  component: MapLabel,
}

const Template: Story<MapLabelProps> = (args) => <MapLabel {...args} />

export const Default = Template.bind({})
Default.args = {
  children: <>Label</>,
}
