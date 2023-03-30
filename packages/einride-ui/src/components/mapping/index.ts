import ChargerIcon from "./charger.svg"
import ChargerIconDark from "./chargerDark.svg"
import ChargerSmallIcon from "./chargerSmall.svg"
import ChargerSmallIconDark from "./chargerSmallDark.svg"
import ConventionalTruckIcon from "./conventionalTruck.svg"
import PodIcon from "./pod.svg"
import SiteIcon from "./site.svg"
import SiteIconDark from "./siteDark.svg"
import SiteHoveredIcon from "./siteHovered.svg"
import SiteSelectedIcon from "./siteSelected.svg"
import SiteSelectedIconDark from "./siteSelectedDark.svg"
import SiteSmallIcon from "./siteSmall.svg"
import SiteSmallIconDark from "./siteSmallDark.svg"
import SiteWithChargerIcon from "./siteWithCharger.svg"
import SiteWithChargerIconDark from "./siteWithChargerDark.svg"
import SiteWithChargerSmall from "./siteWithChargerSmall.svg"
import SiteWithChargerSmallDark from "./siteWithChargerSmallDark.svg"

import { IconMask } from "./types/types"

export {
  ChargerIcon,
  ChargerIconDark,
  ChargerSmallIcon,
  ChargerSmallIconDark,
  ConventionalTruckIcon,
  PodIcon,
  SiteHoveredIcon,
  SiteIcon,
  SiteSelectedIcon,
  SiteSmallIcon,
  SiteSmallIconDark,
  SiteWithChargerIcon,
  SiteWithChargerSmall,
  SiteWithChargerSmallDark,
}

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

export const iconMaskDark: IconMask = {
  url: SiteIconDark,
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
