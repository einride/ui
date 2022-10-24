import { ThemeProvider } from "@emotion/react"
import { MotionConfig } from "framer-motion"
import merge from "lodash.merge"
import { ReactNode } from "react"
import { CSSReset } from "../lib/CSSReset"
import { GlobalStyles } from "../lib/GlobalStyles"
import { themes } from "../lib/theme/theme"
import { useColorScheme } from "./ColorSchemeProvider"

interface EinrideThemeProviderProps {
  children: ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customTheme?: any
  resetCSS?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme?: any
}

export const EinrideThemeProvider = ({
  children,
  customTheme,
  resetCSS,
  theme,
}: EinrideThemeProviderProps): JSX.Element => {
  const { colorScheme } = useColorScheme()
  const defaultTheme = themes[colorScheme]
  const mergedTheme = {
    ...merge(defaultTheme, theme),
    custom: customTheme[colorScheme],
  }

  return (
    <ThemeProvider theme={mergedTheme}>
      {resetCSS && <CSSReset />}
      <GlobalStyles />
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  )
}
