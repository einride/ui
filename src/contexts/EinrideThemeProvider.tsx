import { ThemeProvider } from "@emotion/react"
import { MotionConfig } from "framer-motion"
import merge from "lodash.merge"
import { ReactNode } from "react"
import { CSSReset } from "../lib/CSSReset"
import { GlobalStyles } from "../lib/GlobalStyles"
import { DeepPartial } from "../lib/theme/deep-partial"
import { themes } from "../lib/theme/theme"
import { Theme } from "../lib/theme/types"
import { useColorScheme } from "./ColorSchemeProvider"

interface EinrideThemeProviderProps {
  /** Children of the provider. */
  children: ReactNode

  /** Resets CSS to sensible defaults. */
  resetCSS?: boolean

  /** Overrides the default theme. Can be used to set a font as an example. */
  theme: DeepPartial<Theme> | undefined
}

export const EinrideThemeProvider = ({
  children,
  resetCSS,
  theme,
}: EinrideThemeProviderProps): JSX.Element => {
  const { colorScheme } = useColorScheme()
  const defaultTheme = themes[colorScheme]
  const mergedTheme = merge(defaultTheme, theme)

  return (
    <ThemeProvider theme={mergedTheme}>
      {resetCSS && <CSSReset />}
      <GlobalStyles />
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  )
}
