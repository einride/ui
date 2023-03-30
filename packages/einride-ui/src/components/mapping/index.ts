import ChargerIcon from "./charger.svg"
import ChargerIconDark from "./chargerDark.svg"
import ChargerSmallIcon from "./chargerSmall.svg"
import ChargerSmallIconDark from "./chargerSmallDark.svg"
import ConventionalTruckIcon from "./conventionalTruck.svg"
import PodIcon from "./pod.svg"
import SiteIcon from "./site.svg"
import SiteHoveredIcon from "./siteHovered.svg"
import SiteSelectedIcon from "./siteSelected.svg"
import SiteSmallIcon from "./siteSmall.svg"
import SiteSmallIconDark from "./siteSmallDark.svg"
import SiteWithChargerIcon from "./siteWithCharger.svg"
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
