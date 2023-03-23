import { Meta, StoryObj } from "@storybook/react"
import { ComponentProps } from "react"
import { Map } from "./Map"

const mapboxAccessToken = import.meta.env.VITE_MAPBOX_TOKEN

const meta = {
  component: Map,
} satisfies Meta<typeof Map>

export default meta

const Template = (args: ComponentProps<typeof Map>): JSX.Element => {
  // remove storybook actions for performance reasons
  const props = { ...args }
  Object.keys(props)
    .filter((key) => key.indexOf("on") === 0)
    .forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete props[key]
    })

  return (
    <Map
      style={{
        height: "80vh",
      }}
      id="uiMap"
      initialViewState={{
        latitude: 51.1657,
        longitude: 10.4515,
        zoom: 4,
      }}
      {...props}
    />
  )
}

export const Default = {
  args: {
    activeLanguage: "en",
    showLabels: "none",
    mapboxAccessToken,
    showBoundaries: "all",
  },
  render: (args) => <Template {...(args as ComponentProps<typeof Map>)} />,
} satisfies StoryObj
