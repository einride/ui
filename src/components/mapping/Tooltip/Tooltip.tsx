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
    background-color: ${({ theme }) => theme.colors.background.primary};
  }

  &.dark-popup.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
    border-top-color: ${({ theme }) => theme.colors.background.primary};
  }

  &.dark-popup.mapboxgl-popup-anchor-top .mapboxgl-popup-tip {
    border-bottom-color: ${({ theme }) => theme.colors.background.primary};
  }

  &.dark-popup.mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
    border-left-color: ${({ theme }) => theme.colors.background.primary};
  }

  &.dark-popup.mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
    border-right-color: ${({ theme }) => theme.colors.background.primary};
  }
`
