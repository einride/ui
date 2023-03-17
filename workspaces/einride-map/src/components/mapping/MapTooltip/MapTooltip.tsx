import { Card } from "../../../../../einride-ui/src/main"
import styled from "@emotion/styled"
import { ReactNode } from "react"
import { Popup } from "react-map-gl"
import { Coordinate } from "../types/types"

// eslint-disable-next-line import/extensions
import "mapbox-gl/dist/mapbox-gl.css"

interface TooltipProps {
  /** Tooltip content. Wrapped by `Card`. */
  children: ReactNode

  /** Position of tooltip on map */
  position: Coordinate
}

export const MapTooltip = ({ children, position }: TooltipProps): JSX.Element | null => {
  if (!position.lng || !position.lat) {
    return null
  }

  return (
    <StyledPopup longitude={position.lng} latitude={position.lat} closeButton={false} offset={15}>
      <Card>{children}</Card>
    </StyledPopup>
  )
}

const StyledPopup = styled(Popup)`
  .mapboxgl-popup-content {
    background-color: ${({ theme }) => theme.colors.background.primary};
  }

  &.mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
    border-left-color: ${({ theme }) => theme.colors.background.primary};
  }

  &.mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
    border-right-color: ${({ theme }) => theme.colors.background.primary};
  }

  &.mapboxgl-popup-anchor-top .mapboxgl-popup-tip,
  &.mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip,
  &.mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip {
    border-bottom-color: ${({ theme }) => theme.colors.background.primary};
  }

  &.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip,
  &.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip,
  &.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip {
    border-top-color: ${({ theme }) => theme.colors.background.primary};
  }
`
