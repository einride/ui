import type { Theme as EinrideTheme } from "@einride/ui"
import "@emotion/react"

declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends EinrideTheme {}
}
