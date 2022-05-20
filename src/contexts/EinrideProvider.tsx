import { usePrefersColorScheme } from "@einride/hooks"
import { ThemeProvider } from "@emotion/react"
import merge from "lodash.merge"
import { ReactNode } from "react"
import { CSSReset } from "../lib/CSSReset"
import { GlobalStyles } from "../lib/GlobalStyles"
import { themes } from "../lib/theme/theme"
import { ColorScheme, ColorSchemeProvider } from "./ColorSchemeProvider"

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

  const defaultTheme = themes[colorScheme]
  const mergedTheme = {
    ...merge(defaultTheme, theme),
    custom: customTheme[colorScheme],
  }

  return (
    <ColorSchemeProvider colorScheme={colorScheme}>
      <ThemeProvider theme={mergedTheme}>
        {resetCSS && <CSSReset />}
        <GlobalStyles />
        {children}
      </ThemeProvider>
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
