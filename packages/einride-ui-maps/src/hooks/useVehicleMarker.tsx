import { useCallback } from "react"
import aetDefault from "../assets/aet.svg"
import aetWarning from "../assets/aetWarning.svg"
import cetDefault from "../assets/cet.svg"
import cetWarning from "../assets/cetWarning.svg"
import { MarkerMask, VehicleMarkerName, VehicleMarkerState } from "../types/types"

type VehicleMarker = {
  [j in VehicleMarkerName]: {
    [n in VehicleMarkerState]: MarkerMask
  }
}

type UseMarkerReturnType<Name, State> = {
  getMarker: (name: Name, state: State) => MarkerMask
}

export const useVehicleMarker = (): UseMarkerReturnType<VehicleMarkerName, VehicleMarkerState> => {
  const getMarker = useCallback(
    (name: VehicleMarkerName, state: VehicleMarkerState = "default") => {
      return vehicleMarkers[name][state]
    },
    [],
  )

  return {
    getMarker,
  }
}

const vehicleMarkers: VehicleMarker = {
  aet: {
    default: { url: aetDefault, width: 160 / 2, height: 110 / 2 },
    warning: { url: aetWarning, width: 160 / 2, height: 110 / 2 },
  },
  cet: {
    default: { url: cetDefault, width: 192 / 2, height: 102 / 2 },
    warning: { url: cetWarning, width: 192 / 2, height: 102 / 2 },
  },
}
