import { Global, useTheme } from "@emotion/react"
import * as React from "react"

export const GlobalStyles = () => {
  const theme = useTheme()
  return (
    <Global
      styles={`
        html {
          font-family: ${theme.fonts.body};
        }

        body {
          --einride-ui-grid-columns: 4;
          --einride-ui-grid-gap: ${2 * theme.spacer}px;

          ${theme.breakpoint.medium} {
            --einride-ui-grid-columns: 8;
            --einride-ui-grid-gap: ${3 * theme.spacer}px;
          }

          ${theme.breakpoint.large} {
            --einride-ui-grid-columns: 12;
            --einride-ui-grid-gap: ${3 * theme.spacer}px;
          }
        }
      `}
    />
  )
}
