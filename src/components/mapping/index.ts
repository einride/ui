export type {
  Coordinate,
  MarkerMask,
  MarkerName,
  VehicleMarkerName,
  MarkerState,
  VehicleState,
} from "./types"

export { MapTooltip } from "./MapTooltip/MapTooltip"

export const mapboxStyleLight = "mapbox://styles/einride-portal/cldsp1a9q004c01mg4mmwtbi8"
export const mapboxStyleDark = "mapbox://styles/einride-portal/cldu093rd000a01mz5sg5cye3"
export const mapboxStyleLightOrchestrate =
  "mapbox://styles/einride-portal/cl9pffnl8003r14vqtdvg5val"
export const mapboxStyleDarkOrchestrate = "mapbox://styles/einride-portal/cl9pfirmr000u14molltrlf3y"

export { useStyleLoad } from "./hooks/useStyleLoad"

export { useMapMarker, useVehicleMarker } from "./markers/useMapMarker"

export * from "./markers/markers.deprecated"
