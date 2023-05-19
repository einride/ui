import { useColorScheme } from "@einride/ui"
import { useCallback } from "react"
import chargerDark from "../assets/dark/charger.svg"
import chargerHoverDark from "../assets/dark/chargerHover.svg"
import chargerSelectedDark from "../assets/dark/chargerSelected.svg"
import hubDark from "../assets/dark/hub.svg"
import hubElectricDark from "../assets/dark/hubElectric.svg"
import hubElectricHoverDark from "../assets/dark/hubElectricHover.svg"
import hubElectricSelectedDark from "../assets/dark/hubElectricSelected.svg"
import hubHoverDark from "../assets/dark/hubHover.svg"
import hubSelectedDark from "../assets/dark/hubSelected.svg"
import hubWithChargerDark from "../assets/dark/hubWithCharger.svg"
import hubWithChargerHoverDark from "../assets/dark/hubWithChargerHover.svg"
import hubWithChargerSelectedDark from "../assets/dark/hubWithChargerSelected.svg"
import siteDark from "../assets/dark/site.svg"
import siteElectricDark from "../assets/dark/siteElectric.svg"
import siteElectricHoverDark from "../assets/dark/siteElectricHover.svg"
import siteElectricSelectedDark from "../assets/dark/siteElectricSelected.svg"
import siteHoverDark from "../assets/dark/siteHover.svg"
import siteSelectedDark from "../assets/dark/siteSelected.svg"
import siteWithChargerDark from "../assets/dark/siteWithCharger.svg"
import siteWithChargerElectricDark from "../assets/dark/siteWithChargerElectric.svg"
import siteWithChargerElectricHoverDark from "../assets/dark/siteWithChargerElectricHover.svg"
import siteWithChargerElectricSelectedDark from "../assets/dark/siteWithChargerElectricSelected.svg"
import siteWithChargerHoverDark from "../assets/dark/siteWithChargerHover.svg"
import siteWithChargerSelectedDark from "../assets/dark/siteWithChargerSelected.svg"
import chargerLight from "../assets/light/charger.svg"
import chargerHoverLight from "../assets/light/chargerHover.svg"
import chargerSelectedLight from "../assets/light/chargerSelected.svg"
import hubLight from "../assets/light/hub.svg"
import hubElectricLight from "../assets/light/hubElectric.svg"
import hubElectricHoverLight from "../assets/light/hubElectricHover.svg"
import hubElectricSelectedLight from "../assets/light/hubElectricSelected.svg"
import hubHoverLight from "../assets/light/hubHover.svg"
import hubSelectedLight from "../assets/light/hubSelected.svg"
import hubWithChargerLight from "../assets/light/hubWithCharger.svg"
import hubWithChargerHoverLight from "../assets/light/hubWithChargerHover.svg"
import hubWithChargerSelectedLight from "../assets/light/hubWithChargerSelected.svg"
import siteLight from "../assets/light/site.svg"
import siteElectricLight from "../assets/light/siteElectric.svg"
import siteElectricHoverLight from "../assets/light/siteElectricHover.svg"
import siteElectricSelectedLight from "../assets/light/siteElectricSelected.svg"
import siteHoverLight from "../assets/light/siteHover.svg"
import siteSelectedLight from "../assets/light/siteSelected.svg"
import siteWithChargerLight from "../assets/light/siteWithCharger.svg"
import siteWithChargerElectricLight from "../assets/light/siteWithChargerElectric.svg"
import siteWithChargerElectricHoverLight from "../assets/light/siteWithChargerElectricHover.svg"
import siteWithChargerElectricSelectedLight from "../assets/light/siteWithChargerElectricSelected.svg"
import siteWithChargerHoverLight from "../assets/light/siteWithChargerHover.svg"
import siteWithChargerSelectedLight from "../assets/light/siteWithChargerSelected.svg"
import { MarkerMask, MarkerName, MarkerState } from "../types/types"

const size = {
  height: 48,
  width: 50,
}

type UseMarkerReturnType<Name, State> = {
  getMarker: (name: Name, state: State) => MarkerMask
}

type Marker = {
  [i in "light" | "dark"]: {
    [j in MarkerName]: {
      [k in MarkerState]: string
    }
  }
}

export const useMarker = (): UseMarkerReturnType<MarkerName, MarkerState> => {
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

const markers: Marker = {
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
    site: {
      default: siteLight,
      hover: siteHoverLight,
      selected: siteSelectedLight,
    },
    siteElectric: {
      default: siteElectricLight,
      hover: siteElectricHoverLight,
      selected: siteElectricSelectedLight,
    },
    siteWithCharger: {
      default: siteWithChargerLight,
      hover: siteWithChargerHoverLight,
      selected: siteWithChargerSelectedLight,
    },
    siteWithChargerElectric: {
      default: siteWithChargerElectricLight,
      hover: siteWithChargerElectricHoverLight,
      selected: siteWithChargerElectricSelectedLight,
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
    site: {
      default: siteDark,
      hover: siteHoverDark,
      selected: siteSelectedDark,
    },
    siteElectric: {
      default: siteElectricDark,
      hover: siteElectricHoverDark,
      selected: siteElectricSelectedDark,
    },
    siteWithCharger: {
      default: siteWithChargerDark,
      hover: siteWithChargerHoverDark,
      selected: siteWithChargerSelectedDark,
    },
    siteWithChargerElectric: {
      default: siteWithChargerElectricDark,
      hover: siteWithChargerElectricHoverDark,
      selected: siteWithChargerElectricSelectedDark,
    },
  },
}
