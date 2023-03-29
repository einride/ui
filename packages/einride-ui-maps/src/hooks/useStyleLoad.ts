import { MutableRefObject, useCallback, useRef } from "react"
import { MapRef, MapboxEvent } from "react-map-gl"

interface StyleLoadProp {
  onStyleLoad?: (event: MapboxEvent) => void
}

export const useStyleLoad = ({ onStyleLoad }: StyleLoadProp): StyleLoadReturn => {
  const mapRef = useRef<MapRef>()

  const onMapMount = useCallback(
    (node: MapRef) => {
      mapRef.current = node

      const map = node?.getMap()
      if (map && onStyleLoad) {
        map.on("style.load", onStyleLoad)
        return () => map.off("style.load", onStyleLoad)
      }
      return null
    },
    [onStyleLoad],
  )

  return {
    mapRef,
    onMapMount,
  }
}

interface StyleLoadReturn {
  mapRef: MutableRefObject<MapRef | undefined>
  onMapMount: (node: MapRef) => void
}
