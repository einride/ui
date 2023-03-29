export interface Coordinate {
  lat: number
  lng: number
}

export interface IconMask {
  url: string
  height: number
  width: number
  mask: boolean
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
export type MarkerState = "hover" | "selected" | "default"

export type VehicleMarkerName = "aet" | "cet"
export type VehicleMarkerState = "warning" | "default"
