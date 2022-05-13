import { createContext, ReactNode, useContext } from "react"

interface ColorModeProviderProps {
  children: ReactNode
  colorMode: ColorMode
}

export const ColorModeProvider = ({
  children,
  colorMode,
}: ColorModeProviderProps): JSX.Element => {
  return <Context.Provider value={colorMode}>{children}</Context.Provider>
}

const Context = createContext<ColorMode>("light")

export const useColorMode = (): ColorMode => {
  const colorMode = useContext(Context)

  if (!colorMode) {
    throw new Error("useColorMode must be used within a EinrideProvider")
  }

  return colorMode
}

export type ColorMode = "light" | "dark"
