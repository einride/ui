import { ComponentProps, useCallback, useEffect } from "react"
import ReactMapGL, { ImmutableLike } from "react-map-gl"
import { mapboxStyleDark, mapboxStyleLight, useStyleLoad } from ".."
import { useColorScheme } from "../../../contexts/ColorSchemeProvider"

interface MapProps {
  showLabels?: "all" | "reduced" | "none"
  showBoundaries?: "all" | "reduced" | "none"
  activeLanguage: string
  mapboxAccessToken: string
}

const OPTIONAL_LABELS = ["state-label", "country-label"]
const OPTIONAL_BOUNDARIES = ["admin-0-boundary", "admin-0-boundary-bg"]

export const Map = ({
  showLabels = "all",
  showBoundaries = "all",
  activeLanguage,
  mapStyle,
  ...props
}: MapProps & ComponentProps<typeof ReactMapGL>): JSX.Element => {
  const { colorScheme } = useColorScheme()
  const isDark = colorScheme === "dark"

  const onStyleLoad = (): void => {
    toggleLabelLayers()
    localizeMap()
    toggleBoundaryLayers()
  }

  const { mapRef, onMapMount } = useStyleLoad({
    onStyleLoad,
  })

  const localizeMap = useCallback((): void => {
    if (showLabels === "none") {
      return
    }
    const map = mapRef.current?.getMap()
    map?.getStyle().layers.forEach((layer) => {
      if (layer.id.endsWith("-label")) {
        map.setLayoutProperty(layer.id, "text-field", [
          "coalesce",
          ["get", `name_${activeLanguage}`],
          ["get", "name"],
        ])
      }
    })
  }, [activeLanguage, mapRef, showLabels])

  const toggleLabelLayers = useCallback((): void => {
    const map = mapRef.current?.getMap()
    const { layers } = map?.getStyle() || {}
    if (showLabels === "none") {
      layers?.forEach((layer) => {
        if (layer.id.endsWith("-label")) {
          map?.setLayoutProperty(layer.id, "visibility", "none")
        }
      })
    } else if (showLabels === "all") {
      layers?.forEach((layer) => {
        if (layer.id.endsWith("-label")) {
          map?.setLayoutProperty(layer.id, "visibility", "visible")
        }
      })
    } else if (showLabels === "reduced") {
      layers?.forEach((layer) => {
        if (layer.id.endsWith("-label")) {
          map?.setLayoutProperty(
            layer.id,
            "visibility",
            OPTIONAL_LABELS.includes(layer.id) ? "visible" : "none",
          )
        }
      })
    }
  }, [mapRef, showLabels])

  const toggleBoundaryLayers = useCallback((): void => {
    const map = mapRef.current?.getMap()
    const { layers } = map?.getStyle() || {}
    if (showBoundaries === "none") {
      layers?.forEach((layer) => {
        if (layer.id.includes("boundary")) {
          map?.setLayoutProperty(layer.id, "visibility", "none")
        }
      })
    } else if (showBoundaries === "all") {
      layers?.forEach((layer) => {
        if (layer.id.includes("boundary")) {
          map?.setLayoutProperty(layer.id, "visibility", "visible")
        }
      })
    } else if (showBoundaries === "reduced") {
      layers?.forEach((layer) => {
        if (layer.id.includes("boundary")) {
          map?.setLayoutProperty(
            layer.id,
            "visibility",
            OPTIONAL_BOUNDARIES.includes(layer.id) ? "visible" : "none",
          )
        }
      })
    }
  }, [mapRef, showBoundaries])

  useEffect(() => {
    toggleLabelLayers()
    localizeMap()
  }, [localizeMap, showLabels, toggleLabelLayers])

  useEffect(() => {
    toggleBoundaryLayers()
  }, [showBoundaries, toggleBoundaryLayers])

  const getMapStyle = (): string | mapboxgl.Style | ImmutableLike => {
    if (mapStyle && mapStyle !== ReactMapGL.defaultProps?.mapStyle) {
      return mapStyle
    }
    return isDark ? mapboxStyleDark : mapboxStyleLight
  }

  return (
    <ReactMapGL
      // DO NOT change the order as defaultProps override mapStyle
      {...props}
      mapStyle={getMapStyle()}
      ref={onMapMount}
    />
  )
}

// deck.gl needs react-map-gl default props
Map.defaultProps = { ...ReactMapGL.defaultProps }
