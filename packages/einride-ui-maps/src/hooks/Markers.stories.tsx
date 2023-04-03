import { Card, Text } from "@einride/ui"
import styled from "@emotion/styled"
import { Meta, StoryObj } from "@storybook/react"
import { MarkerName, MarkerState } from "../types/types"
import { useMarker } from "./useMarker"

const markerNames: MarkerName[] = [
  "site",
  "siteElectric",
  "hub",
  "hubElectric",
  "charger",
  "siteWithCharger",
  "hubWithCharger",
]
const markerStates: MarkerState[] = ["default", "hover", "selected"]

const meta = {
  title: "Markers",
} satisfies Meta

export default meta

export const All = {
  render: () => (
    <Wrapper>
      {markerNames.map((name) => {
        return markerStates.map((state) => {
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

export const One = {
  args: {
    name: "site",
    state: "default",
  },
  argTypes: {
    name: {
      control: "select",
      options: markerNames,
    },
    state: {
      control: "radio",
      options: markerStates,
    },
  },
  render: (args) => <Marker {...(args as MarkerProps)} />,
} satisfies StoryObj

interface MarkerProps {
  name: MarkerName
  state: MarkerState
}

const Marker = ({ name, state }: MarkerProps): JSX.Element => {
  const { getMarker } = useMarker()
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