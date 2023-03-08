import { ComponentMeta, ComponentStoryObj } from "@storybook/react"
import { SnapshotWrapper } from "../../../lib/storybook/SnapshotWrapper"
import { Group } from "../../layout/Group/Group"
import { Stack } from "../../layout/Stack/Stack"
import { Text } from "../../typography/Text/Text"
import { MarkerName, MarkerState } from "../types"
import { useMapMarker } from "./useMapMarker"

const MARKER_NAMES: MarkerName[] = [
  "siteWithCharger",
  "site",
  "siteElectric",
  "hub",
  "hubWithCharger",
  "hubElectric",
  "charger",
]
const STATES: MarkerState[] = ["default", "hover", "selected"]

export default {
  title: "Mapping/Markers/Site",
} satisfies ComponentMeta<typeof Template>

type Story = ComponentStoryObj<typeof Template>

const Marker = ({ name, state }: { name: MarkerName; state: MarkerState }): JSX.Element => {
  const { getMarker } = useMapMarker()
  const icon = getMarker(name, state)
  return (
    <Group background="tertiary" style={{ alignItems: "center" }} padding="md">
      <img src={icon.url} alt={name} />
      <Text variant="bodySm" font="mono">
        {[name, state || "default"].join(", ")}
      </Text>
    </Group>
  )
}

const Template = (): JSX.Element => {
  return (
    <Stack gap="none">
      {MARKER_NAMES.map((name) => {
        return STATES.map((state) => {
          return <Marker key={`${name}_${state}`} name={name} state={state} />
        })
      })}
    </Stack>
  )
}

export const All = {
  render: () => <Template />,
} satisfies Story

export const One = {
  args: {
    name: "site",
    state: "default",
  },
  argTypes: {
    name: {
      control: "select",
      options: MARKER_NAMES,
    },
    state: {
      control: "radio",
      options: STATES,
    },
  },
  render: (args) => <Marker {...args} />,
} satisfies ComponentStoryObj<typeof Marker>

export const Snapshot = {
  render: () => (
    <SnapshotWrapper alignItems="stretch">
      {[All].map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Template key={index} />
      ))}
    </SnapshotWrapper>
  ),
  parameters: { chromatic: { disableSnapshot: false } },
} satisfies Story
