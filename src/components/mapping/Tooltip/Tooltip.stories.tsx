import { ComponentMeta, ComponentStory, ComponentStoryObj } from "@storybook/react"
import { Map } from "react-map-gl"
import { mapboxStyleLight, mapboxStyleDark } from ".."
import { useColorScheme } from "../../../contexts/ColorSchemeProvider"
import { Text } from "../../typography/Text/Text"
import { MapTooltip as Tooltip } from "./Tooltip"

const reactAppMapboxAccessToken = import.meta.env.VITE_MAPBOX_TOKEN

export default {
  title: "Mapping/Tooltip",
  component: Tooltip,
  render: (args) => <Template {...args} />,
} satisfies ComponentMeta<typeof Tooltip>

type Story = ComponentStoryObj<typeof Tooltip>

const Template: ComponentStory<typeof Tooltip> = (args): JSX.Element => {
  const { colorScheme } = useColorScheme()
  return (
    <Map
      style={{
        height: "80vh",
      }}
      id="uiMap"
      mapboxAccessToken={reactAppMapboxAccessToken}
      mapStyle={colorScheme === "light" ? mapboxStyleLight : mapboxStyleDark}
      initialViewState={{
        latitude: 51.1657,
        longitude: 10.4515,
        zoom: 4,
      }}
    >
      <Tooltip {...args} />
    </Map>
  )
}

export const Default = {
  args: {
    label: <Text>Lorem Ipsum</Text>,
    position: {
      lat: 51.1657,
      lng: 10.4515,
    },
  },
} satisfies Story
