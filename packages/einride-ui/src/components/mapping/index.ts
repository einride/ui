import PodIcon from "./pod.svg"
import SiteIcon from "./site.svg"

import { IconMask } from "./types/types"

export { PodIcon }

export const coloredIconMask: IconMask = {
  url: SiteIcon,
  height: 96,
  width: 96,
  mask: true,
}
