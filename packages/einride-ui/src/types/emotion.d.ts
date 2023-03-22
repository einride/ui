import "@emotion/react"
import type { Theme as EinrideTheme } from "@einride/core"

declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends EinrideTheme {}
}
