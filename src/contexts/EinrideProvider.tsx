import { usePrefersColorScheme } from "@einride/hooks"
import { ReactNode } from "react"
import { ColorScheme, ColorSchemeProvider } from "./ColorSchemeProvider"
import { EinrideThemeProvider } from "./EinrideThemeProvider"

interface EinrideProviderProps {
  /** Children of the provider. */
  children: ReactNode

  /** Color mode used. Default is `light`. */
  colorMode?: ColorMode

  /** Extends the theme by adding properties to `theme.custom`. Pass an object with `dark` and `light` properties to support both modes. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customTheme?: any

  /** Resets CSS to sensible defaults. Default is `true`.  */
  resetCSS?: boolean

  /** Overrides the default theme. Can be used to set a font as an example. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme?: any
}

export const EinrideProvider = ({
  children,
  colorMode = "light",
  customTheme = {},
  resetCSS = true,
  theme = {},
}: EinrideProviderProps): JSX.Element => {
  const colorScheme = useColorScheme(colorMode)

  return (
    <ColorSchemeProvider colorScheme={colorScheme}>
      <EinrideThemeProvider resetCSS={resetCSS} customTheme={customTheme} theme={theme}>
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
