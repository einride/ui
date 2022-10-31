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
          
          --einride-ui-vertical-spacing-background: none;
          --einride-ui-horizontal-spacing-background: none;
          --einride-ui-grid-columns: 4;
          --einride-ui-grid-gap: ${2 * theme.spacer}px;

          @media ${theme.mediaQueries.md} {
            --einride-ui-grid-columns: 8;
            --einride-ui-grid-gap: ${2 * theme.spacer}px;
          }

          @media ${theme.mediaQueries.lg} {
            --einride-ui-grid-columns: 12;
            --einride-ui-grid-gap: ${3 * theme.spacer}px;
          }
        }
      `}
    />
  )
}
