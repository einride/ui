import { ThemeProvider } from "@emotion/react"
import * as React from "react"
import { createContext, ReactNode, useContext } from "react"
import { themes } from "../../theme"
import { CSSReset } from "../CSSReset"

type ColorMode = "light" | "dark"

export const Context = createContext<ColorMode>("light")

interface EinrideProviderProps {
  children: ReactNode
  colorMode?: ColorMode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customTheme?: any
  resetCSS?: boolean
}

export const EinrideProvider = ({
  children,
  colorMode = "light",
  customTheme = {},
  resetCSS = true,
}: EinrideProviderProps) => {
  const defaultTheme = themes[colorMode]
  const theme = {
    ...defaultTheme,
    custom: customTheme[colorMode],
  }

  return (
    <Context.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {resetCSS && <CSSReset />}
        {children}
      </ThemeProvider>
    </Context.Provider>
  )
}

export const useColorMode = () => {
  const colorMode = useContext(Context)

  if (!colorMode) {
    throw new Error("useColorMode must be used within a EinrideProvider")
  }

  return colorMode
}
