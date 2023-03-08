/* eslint-disable import/order */
import { MarkerMask, MarkerName, MarkerState, VehicleState, VehicleMarkerName } from "../types"

import aetDefault from "./assets/aet.svg"
import aetWarning from "./assets/aetWarning.svg"
import cetDefault from "./assets/cet.svg"
import cetWarning from "./assets/cetWarning.svg"

import siteWithChargerSelectedLight from "./assets/light/siteWithChargerSelected.svg"
import siteWithChargerHoverLight from "./assets/light/siteWithChargerHover.svg"
import siteHoverLight from "./assets/light/siteHover.svg"
import siteSelectedLight from "./assets/light/siteSelected.svg"
import siteWithChargerLight from "./assets/light/siteWithCharger.svg"
import siteLight from "./assets/light/site.svg"
import siteElectricLight from "./assets/light/siteElectric.svg"
import siteElectricHoverLight from "./assets/light/siteElectricHover.svg"
import siteElectricSelectedLight from "./assets/light/siteElectricSelected.svg"
import hubHoverLight from "./assets/light/hubHover.svg"
import hubSelectedLight from "./assets/light/hubSelected.svg"
import hubWithChargerHoverLight from "./assets/light/hubWithChargerHover.svg"
import hubWithChargerSelectedLight from "./assets/light/hubWithChargerSelected.svg"
import hubWithChargerLight from "./assets/light/hubWithCharger.svg"
import hubElectricLight from "./assets/light/hubElectric.svg"
import hubElectricHoverLight from "./assets/light/hubElectricHover.svg"
import hubElectricSelectedLight from "./assets/light/hubElectricSelected.svg"
import chargerHoverLight from "./assets/light/chargerHover.svg"
import chargerSelectedLight from "./assets/light/chargerSelected.svg"
import hubLight from "./assets/light/hub.svg"
import chargerLight from "./assets/light/charger.svg"

import siteWithChargerSelectedDark from "./assets/dark/siteWithChargerSelected.svg"
import siteWithChargerHoverDark from "./assets/dark/siteWithChargerHover.svg"
import siteHoverDark from "./assets/dark/siteHover.svg"
import siteSelectedDark from "./assets/dark/siteSelected.svg"
import siteWithChargerDark from "./assets/dark/siteWithCharger.svg"
import siteDark from "./assets/dark/site.svg"
import siteElectricDark from "./assets/dark/siteElectric.svg"
import siteElectricHoverDark from "./assets/dark/siteElectricHover.svg"
import siteElectricSelectedDark from "./assets/dark/siteElectricSelected.svg"
import hubHoverDark from "./assets/dark/hubHover.svg"
import hubSelectedDark from "./assets/dark/hubSelected.svg"
import hubWithChargerHoverDark from "./assets/dark/hubWithChargerHover.svg"
import hubWithChargerSelectedDark from "./assets/dark/hubWithChargerSelected.svg"
import hubWithChargerDark from "./assets/dark/hubWithCharger.svg"
import hubElectricDark from "./assets/dark/hubElectric.svg"
import hubElectricHoverDark from "./assets/dark/hubElectricHover.svg"
import hubElectricSelectedDark from "./assets/dark/hubElectricSelected.svg"
import chargerHoverDark from "./assets/dark/chargerHover.svg"
import chargerSelectedDark from "./assets/dark/chargerSelected.svg"
import hubDark from "./assets/dark/hub.svg"
import chargerDark from "./assets/dark/charger.svg"
import { ColorScheme, useColorScheme } from "../../../contexts/ColorSchemeProvider"

import { useCallback } from "react"

const size = {
  height: 48,
  width: 50,
}

type UseMarkerReturnType<Name, State> = {
  getMarker: (name: Name, state: State) => MarkerMask
}

type MarkerMapType = {
  [i in ColorScheme]: {
    [j in MarkerName]: {
      [n in MarkerState]: string
    }
  }
}
type VehicleMapType = {
  [j in VehicleMarkerName]: {
    [n in VehicleState]: MarkerMask
  }
}

export const useMapMarker = (): UseMarkerReturnType<MarkerName, MarkerState> => {
  const { colorScheme } = useColorScheme()
  const getMarker = useCallback(
    (name: MarkerName, state: MarkerState = "default") => {
      return {
        url: markers[colorScheme][name][state],
        ...size,
      }
    },
    [colorScheme],
  )

  return {
    getMarker,
  }
}

export const useVehicleMarker = (): UseMarkerReturnType<VehicleMarkerName, VehicleState> => {
  const getMarker = useCallback((name: VehicleMarkerName, state: VehicleState = "default") => {
    return vehicleMarkers[name][state]
  }, [])

  return {
    getMarker,
  }
}

const vehicleMarkers: VehicleMapType = {
  aet: {
    default: { url: aetDefault, width: 160 / 2, height: 110 / 2 },
    warning: { url: aetWarning, width: 160 / 2, height: 110 / 2 },
  },
  cet: {
    default: { url: cetDefault, width: 192 / 2, height: 102 / 2 },
    warning: { url: cetWarning, width: 192 / 2, height: 102 / 2 },
  },
}

const markers: MarkerMapType = {
  light: {
    charger: {
      default: chargerLight,
      hover: chargerHoverLight,
      selected: chargerSelectedLight,
    },
    hub: {
      default: hubLight,
      hover: hubHoverLight,
      selected: hubSelectedLight,
    },
    hubElectric: {
      default: hubElectricLight,
      hover: hubElectricHoverLight,
      selected: hubElectricSelectedLight,
    },
    hubWithCharger: {
      default: hubWithChargerLight,
      hover: hubWithChargerHoverLight,
      selected: hubWithChargerSelectedLight,
    },
    siteElectric: {
      default: siteElectricLight,
      hover: siteElectricHoverLight,
      selected: siteElectricSelectedLight,
    },
    site: {
      default: siteLight,
      hover: siteHoverLight,
      selected: siteSelectedLight,
    },
    siteWithCharger: {
      default: siteWithChargerLight,
      hover: siteWithChargerHoverLight,
      selected: siteWithChargerSelectedLight,
    },
  },
  dark: {
    charger: {
      default: chargerDark,
      hover: chargerHoverDark,
      selected: chargerSelectedDark,
    },
    hub: {
      default: hubDark,
      hover: hubHoverDark,
      selected: hubSelectedDark,
    },
    hubElectric: {
      default: hubElectricDark,
      hover: hubElectricHoverDark,
      selected: hubElectricSelectedDark,
    },
    hubWithCharger: {
      default: hubWithChargerDark,
      hover: hubWithChargerHoverDark,
      selected: hubWithChargerSelectedDark,
    },
    siteElectric: {
      default: siteElectricDark,
      hover: siteElectricHoverDark,
      selected: siteElectricSelectedDark,
    },
    site: {
      default: siteDark,
      hover: siteHoverDark,
      selected: siteSelectedDark,
    },
    siteWithCharger: {
      default: siteWithChargerDark,
      hover: siteWithChargerHoverDark,
      selected: siteWithChargerSelectedDark,
    },
  },
}
