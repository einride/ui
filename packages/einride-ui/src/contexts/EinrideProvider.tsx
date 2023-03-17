import { usePrefersColorScheme } from "@einride/hooks"
import { ReactNode } from "react"
import { DeepPartial } from "../lib/theme/deep-partial"
import { Theme } from "../lib/theme/types"
import { ColorScheme, ColorSchemeProvider } from "./ColorSchemeProvider"
import { EinrideThemeProvider } from "./EinrideThemeProvider"

interface EinrideProviderProps {
  /** Children of the provider. */
  children: ReactNode

  /** Color mode used. Default is `light`. */
  colorMode?: ColorMode

  /** Resets CSS to sensible defaults. Default is `true`.  */
  resetCSS?: boolean

  /** Overrides the default theme. Can be used to set a font as an example. */
  theme?: DeepPartial<Theme>
}

export const EinrideProvider = ({
  children,
  colorMode = "system",
  resetCSS = true,
  theme,
}: EinrideProviderProps): JSX.Element => {
  const colorScheme = useColorScheme(colorMode)

  return (
    <ColorSchemeProvider colorScheme={colorScheme}>
      <EinrideThemeProvider resetCSS={resetCSS} theme={theme}>
        {children}
      </EinrideThemeProvider>
    </ColorSchemeProvider>
  )
}

type ColorMode = ColorScheme | "system"

const useColorScheme = (colorMode: ColorMode): ColorScheme => {
  const prefersColorScheme = usePrefersColorScheme()

  if (colorMode === "system") {
    return prefersColorScheme
  }
  return colorMode
}
