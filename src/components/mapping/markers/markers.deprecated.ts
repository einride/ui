/**
 * @deprecated since v7.33.0. The old maker icons have been replaced. Use `getIcon = (iconName, colorScheme, state)` instead.
 */

import { MarkerMask } from "../types"
import PodIcon from "./assets/aet.svg"
import ConventionalTruckIcon from "./assets/cet.svg"
import ChargerIcon from "./assets/charger.svg"
import ChargerIconDark from "./assets/chargerDark.svg"
import ChargerSmallIcon from "./assets/chargerSmall.svg"
import ChargerSmallIconDark from "./assets/chargerSmallDark.svg"
import SiteIcon from "./assets/site.svg"
import SiteIconDark from "./assets/siteDark.svg"
import SiteHoveredIcon from "./assets/siteHovered.svg"
import SiteHoveredIconDark from "./assets/siteHoveredDark.svg"
import SiteSelectedIcon from "./assets/siteSelected.svg"
import SiteSelectedIconDark from "./assets/siteSelectedDark.svg"
import SiteSmallIcon from "./assets/siteSmall.svg"
import SiteSmallIconDark from "./assets/siteSmallDark.svg"
import SiteWithChargerIcon from "./assets/siteWithCharger.svg"
import SiteWithChargerIconDark from "./assets/siteWithChargerDark.svg"
import SiteWithChargerSmall from "./assets/siteWithChargerSmall.svg"
import SiteWithChargerSmallDark from "./assets/siteWithChargerSmallDark.svg"

export {
  /** @deprecated */
  ChargerIcon,
  /** @deprecated */
  ChargerSmallIcon,
  /** @deprecated */
  SiteIcon,
  /** @deprecated */
  SiteHoveredIcon,
  /** @deprecated */
  SiteSelectedIcon,
  /** @deprecated */
  SiteSmallIcon,
  /** @deprecated */
  SiteWithChargerIcon,
  /** @deprecated */
  SiteWithChargerSmall,
  /** @deprecated */
  ChargerIconDark,
  /** @deprecated */
  ChargerSmallIconDark,
  /** @deprecated */
  SiteSmallIconDark,
  /** @deprecated */
  SiteWithChargerSmallDark,
  /** @deprecated */
  ConventionalTruckIcon,
  /** @deprecated */
  PodIcon,
}

/** @deprecated since v7.33.0. `IconMask` was renamed to `MarkerMask`. */
export type IconMask = MarkerMask

/** @deprecated */
export const coloredIconMask: MarkerMask = {
  url: SiteIcon,
  height: 96,
  width: 96,
  mask: true,
}

/** @deprecated */
export const iconMask: MarkerMask = {
  url: SiteIcon,
  height: 96,
  width: 96,
  mask: false,
}

/** @deprecated */
export const hoverIconMask: MarkerMask = {
  url: SiteHoveredIcon,
  height: 96,
  width: 96,
  mask: false,
}

/** @deprecated */
export const selectIconMask: MarkerMask = {
  url: SiteSelectedIcon,
  height: 96,
  width: 96,
  mask: false,
}

/** @deprecated */
export const siteWithChargerIconMask: MarkerMask = {
  url: SiteWithChargerIcon,
  height: 80,
  width: 128,
  mask: false,
}

/** @deprecated */
export const iconMaskDark: MarkerMask = {
  url: SiteIconDark,
  height: 96,
  width: 96,
  mask: false,
}

/** @deprecated */
export const hoverIconMaskDark: MarkerMask = {
  url: SiteHoveredIconDark,
  height: 96,
  width: 96,
  mask: false,
}

/** @deprecated */
export const selectIconMaskDark: MarkerMask = {
  url: SiteSelectedIconDark,
  height: 96,
  width: 96,
  mask: false,
}

/** @deprecated */
export const siteWithChargerIconMaskDark: MarkerMask = {
  url: SiteWithChargerIconDark,
  height: 80,
  width: 128,
  mask: false,
}
