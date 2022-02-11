import { ThemeProvider } from "@emotion/react"
import merge from "lodash.merge"
import { createContext, ReactNode, useContext } from "react"
import { CSSReset } from "../CSSReset/CSSReset"
import { GlobalStyles } from "../GlobalStyles/GlobalStyles"
import { themes } from "../theme/theme"

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
    <Context.Provider value={colorMode}>
      <ThemeProvider theme={mergedTheme}>
        {resetCSS && <CSSReset />}
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </Context.Provider>
  )
}

type ColorMode = "light" | "dark"

export const Context = createContext<ColorMode>("light")

export const useColorMode = () => {
  const colorMode = useContext(Context)

  if (!colorMode) {
    throw new Error("useColorMode must be used within a EinrideProvider")
  }

  return colorMode
}
