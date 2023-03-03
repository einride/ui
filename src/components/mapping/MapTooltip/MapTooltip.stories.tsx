import { ComponentMeta, ComponentStory, ComponentStoryObj } from "@storybook/react"
import { Map } from "react-map-gl"
import { mapboxStyleLight, mapboxStyleDark } from ".."
import { useColorScheme } from "../../../contexts/ColorSchemeProvider"
import { Text } from "../../typography/Text/Text"
import { MapTooltip } from "./MapTooltip"

const mapboxAccessToken = import.meta.env.VITE_MAPBOX_TOKEN

export default {
  title: "Mapping/MapTooltip",
  component: MapTooltip,
  render: (args) => <Template {...args} />,
} satisfies ComponentMeta<typeof MapTooltip>

type Story = ComponentStoryObj<typeof MapTooltip>

const Template: ComponentStory<typeof MapTooltip> = (args): JSX.Element => {
  const { colorScheme } = useColorScheme()
  return (
    <Map
      style={{
        height: "80vh",
      }}
      mapboxAccessToken={mapboxAccessToken}
      mapStyle={colorScheme === "light" ? mapboxStyleLight : mapboxStyleDark}
      initialViewState={{
        latitude: 51.1657,
        longitude: 10.4515,
        zoom: 4,
      }}
    >
      <MapTooltip {...args} />
    </Map>
  )
}

export const Default = {
  args: {
    children: <Text variant="bodyMd">Lorem Ipsum</Text>,
    position: {
      lat: 51.1657,
      lng: 10.4515,
    },
  },
} satisfies Story
