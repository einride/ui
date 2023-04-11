import { Card, Text } from "@einride/ui"
import styled from "@emotion/styled"
import { Meta, StoryObj } from "@storybook/react"
import { VehicleMarkerName, VehicleMarkerState } from "../types/types"
import { useVehicleMarker } from "./useVehicleMarker"

const meta = {
  title: "VehicleMarkers",
} satisfies Meta

export default meta

const vehicleMarkerNames: VehicleMarkerName[] = ["cet", "aet"]
const vehicleMarkerStates: VehicleMarkerState[] = ["default", "warning"]

export const All = {
  render: () => (
    <Wrapper>
      {vehicleMarkerNames.map((name) => {
        return vehicleMarkerStates.map((state) => {
          return (
            <StyledCard key={`${name}-${state}`} background="secondary">
              <Marker name={name} state={state} />
              <Text variant="bodySm" font="mono">
                {name} {state}
              </Text>
            </StyledCard>
          )
        })
      })}
    </Wrapper>
  ),
} satisfies StoryObj

export const Basic = {
  args: {
    name: "aet",
    state: "default",
  },
  argTypes: {
    name: {
      control: "radio",
      options: vehicleMarkerNames,
    },
    state: {
      control: "radio",
      options: vehicleMarkerStates,
    },
  },
  render: (args) => <Marker {...(args as MarkerProps)} />,
} satisfies StoryObj

interface MarkerProps {
  name: VehicleMarkerName
  state: VehicleMarkerState
}

const Marker = ({ name, state }: MarkerProps): JSX.Element => {
  const { getMarker } = useVehicleMarker()
  const icon = getMarker(name, state)
  return <img src={icon.url} alt={name} />
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: ${({ theme }) => theme.spacingBase}rem;
`

const StyledCard = styled(Card)`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
