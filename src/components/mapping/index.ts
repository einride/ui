import ChargerIcon from "./charger.svg"
import ChargerIconDark from "./chargerDark.svg"
import ChargerSmallIcon from "./chargerSmall.svg"
import ChargerSmallIconDark from "./chargerSmallDark.svg"
import ConventionalTruckIcon from "./conventionalTruck.svg"
import PodIcon from "./pod.svg"
import SiteIcon from "./site.svg"
import SiteIconDark from "./siteDark.svg"
import SiteHoveredIcon from "./siteHovered.svg"
import SiteHoveredIconDark from "./siteHoveredDark.svg"
import SiteSelectedIcon from "./siteSelected.svg"
import SiteSelectedIconDark from "./siteSelectedDark.svg"
import SiteSmallIcon from "./siteSmall.svg"
import SiteSmallIconDark from "./siteSmallDark.svg"
import SiteWithChargerIcon from "./siteWithCharger.svg"
import SiteWithChargerIconDark from "./siteWithChargerDark.svg"
import SiteWithChargerSmall from "./siteWithChargerSmall.svg"
import SiteWithChargerSmallDark from "./siteWithChargerSmallDark.svg"

import { Coordinate, IconMask } from "./types/types"

export { MapTooltip } from "./Tooltip/Tooltip"

export const mapboxStyleLight = "mapbox://styles/einride-portal/cldsp1a9q004c01mg4mmwtbi8"
export const mapboxStyleDark = "mapbox://styles/einride-portal/cldu093rd000a01mz5sg5cye3"
export const mapboxStyleLightOrchestrate =
  "mapbox://styles/einride-portal/cl9pffnl8003r14vqtdvg5val"
export const mapboxStyleDarkOrchestrate = "mapbox://styles/einride-portal/cl9pfirmr000u14molltrlf3y"

export { useStyleLoad } from "./hooks/useStyleLoad"

export {
  ChargerIcon,
  ChargerSmallIcon,
  ConventionalTruckIcon,
  PodIcon,
  SiteIcon,
  SiteHoveredIcon,
  SiteSelectedIcon,
  SiteSmallIcon,
  SiteWithChargerIcon,
  SiteWithChargerSmall,
  ChargerIconDark,
  ChargerSmallIconDark,
  SiteSmallIconDark,
  SiteWithChargerSmallDark,
}

export type { IconMask, Coordinate }

export const coloredIconMask: IconMask = {
  url: SiteIcon,
  height: 96,
  width: 96,
  mask: true,
}

export const iconMask: IconMask = {
  url: SiteIcon,
  height: 96,
  width: 96,
  mask: false,
}

export const hoverIconMask: IconMask = {
  url: SiteHoveredIcon,
  height: 96,
  width: 96,
  mask: false,
}

export const selectIconMask: IconMask = {
  url: SiteSelectedIcon,
  height: 96,
  width: 96,
  mask: false,
}

export const siteWithChargerIconMask: IconMask = {
  url: SiteWithChargerIcon,
  height: 80,
  width: 128,
  mask: false,
}

export const iconMaskDark: IconMask = {
  url: SiteIconDark,
  height: 96,
  width: 96,
  mask: false,
}

export const hoverIconMaskDark: IconMask = {
  url: SiteHoveredIconDark,
  height: 96,
  width: 96,
  mask: false,
}

export const selectIconMaskDark: IconMask = {
  url: SiteSelectedIconDark,
  height: 96,
  width: 96,
  mask: false,
}

export const siteWithChargerIconMaskDark: IconMask = {
  url: SiteWithChargerIconDark,
  height: 80,
  width: 128,
  mask: false,
}
