import { ThemeProvider } from "@emotion/react"
import merge from "lodash.merge"
import { ReactNode } from "react"
import { ColorMode, ColorModeProvider } from "./ColorModeProvider"
import { CSSReset } from "./CSSReset"
import { GlobalStyles } from "./GlobalStyles"
import { themes } from "./theme/theme"

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
}: EinrideProviderProps) => {
  const defaultTheme = themes[colorMode]
  const mergedTheme = {
    ...merge(defaultTheme, theme),
    custom: customTheme[colorMode],
  }

  return (
    <ColorModeProvider colorMode={colorMode}>
      <ThemeProvider theme={mergedTheme}>
        {resetCSS && <CSSReset />}
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ColorModeProvider>
  )
}
