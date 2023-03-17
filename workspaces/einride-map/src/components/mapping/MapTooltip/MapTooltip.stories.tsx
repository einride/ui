import { Meta, StoryObj } from "@storybook/react"
import { Text, useColorScheme } from "../../../../../einride-ui/src/main"
import { ComponentProps } from "react"
import { Map } from "react-map-gl"
import { mapboxStyleDark, mapboxStyleLight } from ".."
import { MapTooltip } from "./MapTooltip"

const mapboxAccessToken = import.meta.env.VITE_MAPBOX_TOKEN

const meta = {
  component: MapTooltip,
  render: (args) => <Template {...args} />,
} satisfies Meta<typeof MapTooltip>

export default meta

const Template = (args: ComponentProps<typeof MapTooltip>): JSX.Element => {
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
} satisfies StoryObj
