import { Global } from "@emotion/react"
import { useColorScheme } from "../contexts/ColorSchemeProvider"
import { useTheme } from "../hooks/useTheme"

export const GlobalStyles = (): JSX.Element => {
  const theme = useTheme()
  const { colorScheme } = useColorScheme()

  return (
    <Global
      styles={`
        * {
          font-variant-numeric: ${theme.fontVariants.numeric};
        }

        :root {
          color-scheme: ${colorScheme};
        }

        body {
          background: ${theme.colors.background.primary};
          color: ${theme.colors.content.primary};
          font-family: ${theme.fonts.body};
          font-size: ${theme.fontSizes.md};
        }
      `}
    />
  )
}
