import { MutableRefObject, useCallback, useRef } from "react"
import { MapboxEvent, MapRef } from "react-map-gl"

interface StyleLoadArgs {
  onStyleLoad?: (event: MapboxEvent) => void
}

interface StyleLoadProps {
  mapRef: MutableRefObject<MapRef | undefined>
  onMapMount: (node: MapRef) => void
}

export const useStyleLoad = ({ onStyleLoad }: StyleLoadArgs): StyleLoadProps => {
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
