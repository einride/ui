import { createContext, ReactNode, useContext, useMemo, useState } from "react"

interface ColorSchemeProviderProps {
  children: ReactNode
  colorScheme: ColorScheme
}

export const ColorSchemeProvider = ({
  children,
  colorScheme: initialColorScheme,
}: ColorSchemeProviderProps): JSX.Element => {
  const [colorScheme, setColorScheme] = useState(initialColorScheme)

  const value = useMemo(
    () => ({
      colorScheme,
      setColorScheme,
    }),
    [colorScheme],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

interface ColorSchemeContext {
  colorScheme: ColorScheme
  setColorScheme: (colorScheme: ColorScheme) => void
}

const Context = createContext<ColorSchemeContext | null>(null)

export const useColorScheme = (): ColorSchemeContext => {
  const context = useContext(Context)

  if (!context) {
    throw new Error("useColorScheme must be used within <ColorSchemeProvider>")
  }
  return context
}

export type ColorScheme = "dark" | "light"
