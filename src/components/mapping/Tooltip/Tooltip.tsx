import styled from "@emotion/styled"
import { Popup } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"

import { useColorScheme } from "../../../contexts/ColorSchemeProvider"
import { Card } from "../../cards/Card/Card"
import { Coordinate } from "../types/types"

interface TooltipProps {
  label: JSX.Element | null
  position: Coordinate
}

export const MapTooltip = ({ label, position }: TooltipProps): JSX.Element | null => {
  const { colorScheme } = useColorScheme()

  if (!position.lng || !position.lat) {
    return null
  }

  return (
    <StyledPopup
      className={colorScheme === "dark" ? "dark-popup" : "light-popup"}
      longitude={position.lng}
      latitude={position.lat}
      closeButton={false}
      offset={15}
    >
      <Card>{label}</Card>
    </StyledPopup>
  )
}

const StyledPopup = styled(Popup)`
  &.dark-popup .mapboxgl-popup-content {
    background-color: #121212;
  }

  &.dark-popup .mapboxgl-popup-tip {
    border-top-color: #121212;
  }
`
