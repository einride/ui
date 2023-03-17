import "@emotion/react"
import type { Theme as EinrideTheme } from "@einride/ui/src/lib/theme/types"

declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends EinrideTheme {}
}
