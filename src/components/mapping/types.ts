export interface Coordinate {
  lat: number
  lng: number
}

export interface MarkerMask {
  url: string
  height: number
  width: number
  mask?: boolean
  anchorY?: number
  anchorX?: number
}

export type MarkerName =
  | "siteWithCharger"
  | "site"
  | "siteElectric"
  | "hub"
  | "hubWithCharger"
  | "hubElectric"
  | "charger"

/** Autonomous electric truck or conventional electric truck */
export type VehicleMarkerName = "aet" | "cet"

export type MarkerState = "hover" | "selected" | "default"

export type VehicleState = "warning" | "default"
