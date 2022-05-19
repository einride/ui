import { createContext, ReactNode, useContext } from "react"

interface ColorSchemeProviderProps {
  children: ReactNode
  colorScheme: ColorScheme
}

export const ColorSchemeProvider = ({
  children,
  colorScheme,
}: ColorSchemeProviderProps): JSX.Element => {
  return <Context.Provider value={colorScheme}>{children}</Context.Provider>
}

const Context = createContext<ColorScheme>("light")

export const useColorScheme = (): ColorScheme => {
  const context = useContext(Context)
  if (!context) {
    throw new Error("useColorScheme must be used within <EinrideProvider>")
  }
  return context
}

export type ColorScheme = "dark" | "light"
