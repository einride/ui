import { usePrefersColorScheme } from "@einride/hooks"
import { ReactNode } from "react"
import { ColorScheme, ColorSchemeProvider } from "./ColorSchemeProvider"
import { EinrideThemeProvider } from "./EinrideThemeProvider"

interface EinrideProviderProps {
  children: ReactNode
  colorMode?: ColorMode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customTheme?: any
  resetCSS?: boolean
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
